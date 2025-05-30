import { getUserData } from "./user-events"

// Function to generate a receipt PDF
export function generateReceiptPDF(orderDetails: any) {
  const userData = getUserData()

  // In a real app, you would use a PDF library like jsPDF
  // For this demo, we'll create a text representation
  const receiptContent = `
    RECEIPT
    =======
    
    Homestay Booking
    
    Order ID: ${orderDetails.id}
    Date: ${orderDetails.date}
    Time: ${orderDetails.time}
    
    Customer: ${userData.name}
    Email: ${userData.email}
    Phone: ${userData.phone}
    
    Room: ${orderDetails.roomTitle}
    Check-in: ${orderDetails.checkIn}
    Check-out: ${orderDetails.checkOut}
    Nights: ${orderDetails.nights}
    
    Room Rate: $${orderDetails.price} x ${orderDetails.nights} nights = $${orderDetails.roomTotal}
    Cleaning Fee: $${orderDetails.cleaningFee}
    Service Fee: $${orderDetails.serviceFee}
    
    Total Amount: $${orderDetails.total}
    
    Payment Status: Paid
    
    Thank you for choosing Homestay Booking!
  `

  // Create a Blob with the content
  const blob = new Blob([receiptContent], { type: "text/plain" })

  // Create a download link
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `receipt-${orderDetails.id}.txt`

  // Trigger download
  document.body.appendChild(link)
  link.click()

  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Function to generate an invoice PDF
export function generateInvoicePDF(orderDetails: any) {
  const userData = getUserData()

  // In a real app, you would use a PDF library like jsPDF
  // For this demo, we'll create a text representation
  const invoiceContent = `
    INVOICE
    =======
    
    Homestay Booking
    
    Invoice #: INV-${orderDetails.id}
    Date: ${new Date().toLocaleDateString()}
    
    Billed To:
    ${userData.name}
    ${userData.email}
    ${userData.phone}
    
    Room: ${orderDetails.roomTitle}
    Location: ${orderDetails.location}
    Check-in: ${orderDetails.checkIn}
    Check-out: ${orderDetails.checkOut}
    Nights: ${orderDetails.nights}
    
    Room Rate: $${orderDetails.price} x ${orderDetails.nights} nights = $${orderDetails.roomTotal}
    Cleaning Fee: $50
    Service Fee: $100
    
    Total Amount: $${orderDetails.total}
    
    Payment Status: ${orderDetails.status === "completed" ? "Paid" : "Pending"}
    
    Thank you for your business!
  `

  // Create a Blob with the content
  const blob = new Blob([invoiceContent], { type: "text/plain" })

  // Create a download link
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `invoice-${orderDetails.id}.txt`

  // Trigger download
  document.body.appendChild(link)
  link.click()

  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
