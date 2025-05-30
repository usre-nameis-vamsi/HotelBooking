"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, ChevronRight, Clock, Download, MapPin, Star, Trash2 } from "lucide-react"
import { AuthCheck } from "@/components/auth-check"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

// Import the PDF generator utility
import { generateInvoicePDF } from "@/utils/pdf-generator"
import { BackButton } from "@/components/back-button"

// Mock order data
const orders = [
  {
    id: "ORD20231001",
    roomTitle: "Luxury Ocean View Suite",
    roomImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Sanya Bay",
    checkIn: "2023-10-15",
    checkOut: "2023-10-18",
    price: 698,
    totalPrice: 2094,
    status: "completed",
    createTime: "2023-09-30 14:30",
    payTime: "2023-09-30 14:35",
    isRated: true,
    rating: 5,
    comment:
      "The room was very clean, facilities were complete, service was excellent, and the view was amazing. Will choose here again next time.",
  },
  {
    id: "ORD20230925",
    roomTitle: "Modern City Apartment",
    roomImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Shanghai Downtown",
    checkIn: "2023-10-05",
    checkOut: "2023-10-07",
    price: 458,
    totalPrice: 916,
    status: "completed",
    createTime: "2023-09-25 10:15",
    payTime: "2023-09-25 10:20",
    isRated: false,
  },
  {
    id: "ORD20231010",
    roomTitle: "Classic Courtyard Homestay",
    roomImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Lijiang Old Town",
    checkIn: "2023-10-25",
    checkOut: "2023-10-28",
    price: 528,
    totalPrice: 1584,
    status: "paid",
    createTime: "2023-10-10 16:45",
    payTime: "2023-10-10 16:50",
  },
  {
    id: "ORD20231012",
    roomTitle: "Mountain View Villa",
    roomImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Hangzhou West Lake",
    checkIn: "2023-11-05",
    checkOut: "2023-11-08",
    price: 888,
    totalPrice: 2664,
    status: "pending",
    createTime: "2023-10-12 09:20",
  },
  {
    id: "ORD20230918",
    roomTitle: "Japanese Minimalist Homestay",
    roomImage:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Suzhou Gardens",
    checkIn: "2023-09-20",
    checkOut: "2023-09-22",
    price: 428,
    totalPrice: 856,
    status: "canceled",
    createTime: "2023-09-18 11:30",
    cancelTime: "2023-09-18 15:45",
  },
]

// Status mapping
const statusMap = {
  pending: { label: "Pending Payment", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Paid", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
  canceled: { label: "Canceled", color: "bg-gray-100 text-gray-800" },
}

// Add the handleDownloadInvoice function to the OrdersPage component
export default function OrdersPage() {
  const router = useRouter()
  const [ordersList, setOrdersList] = useState(orders)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewData, setReviewData] = useState({
    orderId: "",
    roomTitle: "",
    rating: 5,
    comment: "",
  })

  const handleCancelOrder = (orderId: string) => {
    setSelectedOrderId(orderId)
    setShowCancelDialog(true)
  }

  const confirmCancelOrder = () => {
    if (selectedOrderId) {
      // Update the order status to canceled
      setOrdersList((prev) =>
        prev.map((order) =>
          order.id === selectedOrderId
            ? { ...order, status: "canceled", cancelTime: new Date().toLocaleString() }
            : order,
        ),
      )
      setShowCancelDialog(false)
      setSelectedOrderId(null)
    }
  }

  const handlePayNow = (orderId: string) => {
    // Find the order to get details for payment
    const order = ordersList.find((o) => o.id === orderId)
    if (order) {
      router.push(
        `/payment?orderId=${orderId}&roomId=1&title=${encodeURIComponent(order.roomTitle)}&price=${order.price}&checkIn=${order.checkIn}&checkOut=${order.checkOut}`,
      )
    }
  }

  // Add function to handle invoice download
  const handleDownloadInvoice = (order: (typeof orders)[0]) => {
    const orderDetails = {
      id: order.id,
      roomTitle: order.roomTitle,
      location: order.location,
      checkIn: order.checkIn,
      checkOut: order.checkOut,
      price: order.price,
      nights: (new Date(order.checkOut).getTime() - new Date(order.checkIn).getTime()) / (1000 * 60 * 60 * 24),
      roomTotal: order.totalPrice,
      cleaningFee: 50,
      serviceFee: 100,
      total: order.totalPrice,
      status: order.status,
    }

    generateInvoicePDF(orderDetails)
  }

  // Add function to handle review submission
  const handleOpenReview = (orderId: string, roomTitle: string) => {
    setReviewData({
      orderId,
      roomTitle,
      rating: 5,
      comment: "",
    })
    setShowReviewDialog(true)
  }

  const handleSubmitReview = () => {
    // Update the order to mark as reviewed
    setOrdersList((prev) =>
      prev.map((order) => {
        if (order.id === reviewData.orderId) {
          return {
            ...order,
            isRated: true,
            rating: reviewData.rating,
            comment: reviewData.comment,
          }
        }
        return order
      }),
    )

    // Close dialog and show success message
    setShowReviewDialog(false)
    alert("Thank you for your review!")
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 py-8">
          <div className="container">
            {/* Add Back Button */}
            <BackButton className="mb-6" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-green-800">My Orders</h1>
                <p className="text-muted-foreground">View and manage all your orders</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link href="/rooms">
                  <Button className="bg-green-600 hover:bg-green-700">Book New Room</Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6 space-y-6">
                {ordersList.length > 0 ? (
                  ordersList.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onCancel={handleCancelOrder}
                      onPay={handlePayNow}
                      onDownloadInvoice={handleDownloadInvoice}
                      onReview={handleOpenReview}
                    />
                  ))
                ) : (
                  <EmptyOrderState />
                )}
              </TabsContent>

              <TabsContent value="pending" className="mt-6 space-y-6">
                {ordersList.filter((order) => order.status === "pending").length > 0 ? (
                  ordersList
                    .filter((order) => order.status === "pending")
                    .map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onCancel={handleCancelOrder}
                        onPay={handlePayNow}
                        onDownloadInvoice={handleDownloadInvoice}
                        onReview={handleOpenReview}
                      />
                    ))
                ) : (
                  <EmptyOrderState status="pending" />
                )}
              </TabsContent>

              <TabsContent value="paid" className="mt-6 space-y-6">
                {ordersList.filter((order) => order.status === "paid").length > 0 ? (
                  ordersList
                    .filter((order) => order.status === "paid")
                    .map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onCancel={handleCancelOrder}
                        onPay={handlePayNow}
                        onDownloadInvoice={handleDownloadInvoice}
                        onReview={handleOpenReview}
                      />
                    ))
                ) : (
                  <EmptyOrderState status="paid" />
                )}
              </TabsContent>

              <TabsContent value="completed" className="mt-6 space-y-6">
                {ordersList.filter((order) => order.status === "completed").length > 0 ? (
                  ordersList
                    .filter((order) => order.status === "completed")
                    .map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onCancel={handleCancelOrder}
                        onPay={handlePayNow}
                        onDownloadInvoice={handleDownloadInvoice}
                        onReview={handleOpenReview}
                      />
                    ))
                ) : (
                  <EmptyOrderState status="completed" />
                )}
              </TabsContent>

              <TabsContent value="canceled" className="mt-6 space-y-6">
                {ordersList.filter((order) => order.status === "canceled").length > 0 ? (
                  ordersList
                    .filter((order) => order.status === "canceled")
                    .map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onCancel={handleCancelOrder}
                        onPay={handlePayNow}
                        onDownloadInvoice={handleDownloadInvoice}
                        onReview={handleOpenReview}
                      />
                    ))
                ) : (
                  <EmptyOrderState status="canceled" />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />

        {/* Cancel Order Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this order? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                <p>Cancellation Policy:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Full refund if cancelled 7 days before check-in</li>
                  <li>50% refund if cancelled 3-7 days before check-in</li>
                  <li>No refund if cancelled less than 3 days before check-in</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                Keep Order
              </Button>
              <Button variant="destructive" onClick={confirmCancelOrder}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Review Dialog */}
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>Share your experience about {reviewData.roomTitle}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= reviewData.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="comment" className="text-sm font-medium">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Share your experience with this room..."
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSubmitReview}
                disabled={!reviewData.comment}
              >
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AuthCheck>
  )
}

// Update the OrderCard component to include the review button
interface OrderCardProps {
  order: (typeof orders)[0]
  onCancel: (orderId: string) => void
  onPay: (orderId: string) => void
  onDownloadInvoice: (order: (typeof orders)[0]) => void
  onReview: (orderId: string, roomTitle: string) => void
}

function OrderCard({ order, onCancel, onPay, onDownloadInvoice, onReview }: OrderCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{order.id}</CardTitle>
              <Badge className={`${statusMap[order.status as keyof typeof statusMap].color}`}>
                {statusMap[order.status as keyof typeof statusMap].label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Order time: {order.createTime}</p>
          </div>
          <div className="flex items-center gap-2">
            {order.status === "pending" && (
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onPay(order.id)}>
                Pay Now
              </Button>
            )}
            {order.status === "completed" && !order.isRated && (
              <Button size="sm" variant="outline" onClick={() => onReview(order.id, order.roomTitle)}>
                <Star className="mr-1 h-4 w-4" />
                Review
              </Button>
            )}
            {order.status === "pending" && (
              <Button size="sm" variant="outline" onClick={() => onCancel(order.id)}>
                <Trash2 className="mr-1 h-4 w-4" />
                Cancel Order
              </Button>
            )}
            <Link href={`/orders/${order.id}`}>
              <Button size="sm" variant="outline">
                Order Details
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-[200px_1fr]">
          <div className="relative">
            <img
              src={order.roomImage || "/placeholder.svg"}
              alt={order.roomTitle}
              className="h-48 w-full object-cover md:h-full"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
              }}
            />
          </div>
          <div className="p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{order.roomTitle}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-4 w-4 text-green-600" />
                  {order.location}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-4 w-4 text-green-600" />
                    <span>
                      {order.checkIn} to {order.checkOut}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4 text-green-600" />
                    <span>
                      Total{" "}
                      {(new Date(order.checkOut).getTime() - new Date(order.checkIn).getTime()) / (1000 * 60 * 60 * 24)}{" "}
                      nights
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 md:text-right">
                <div className="text-sm text-gray-500">Room rate</div>
                <div className="font-medium">${order.price}/night</div>
                <div className="text-sm text-gray-500">Total price</div>
                <div className="text-xl font-bold text-green-700">${order.totalPrice}</div>
              </div>
            </div>

            {order.isRated && (
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">My Review</h4>
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < order.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600">{order.comment}</p>
              </div>
            )}

            {order.status === "completed" && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => onDownloadInvoice(order)}>
                  <Download className="mr-1 h-4 w-4" />
                  Download Invoice
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyOrderState({ status }: { status?: string }) {
  const messages = {
    pending: "No pending orders",
    paid: "No paid orders",
    completed: "No completed orders",
    canceled: "No canceled orders",
    default: "No orders",
  }

  const message = status ? messages[status as keyof typeof messages] : messages.default

  return (
    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
      <Calendar className="h-12 w-12 text-gray-300" />
      <h3 className="mt-4 text-lg font-medium">{message}</h3>
      <p className="mt-2 text-sm text-gray-500">Browse rooms and create new orders</p>
      <Link href="/rooms" className="mt-4">
        <Button className="bg-green-600 hover:bg-green-700">Browse Rooms</Button>
      </Link>
    </div>
  )
}
