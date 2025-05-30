"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, Download, MapPin, Star, MessageCircle, AlertTriangle, CreditCard } from "lucide-react"
import { generateInvoicePDF } from "@/utils/pdf-generator"
import { BackButton } from "@/components/back-button"
import { getUserData } from "@/utils/user-events"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  // Get user data
  const userData = getUserData()
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  })
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false)

  // Mock order details data
  const order = {
    id: params.id,
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
    isRated: false,
    rating: 0,
    comment: "",
    roomDetails: {
      area: "45 sq m",
      bedType: "King Size 2m×2m",
      maxGuests: 2,
      breakfast: "Breakfast for two included",
      wifi: true,
      smoking: false,
    },
    contactInfo: {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
    },
    paymentInfo: {
      method: "Credit Card",
      transactionId: "CC20230930143512345",
      coupon: "$50 off on $200+",
      couponAmount: 50,
      originalPrice: 2144,
    },
  }

  // Add function to handle invoice download
  const handleDownloadInvoice = () => {
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
      customerName: userData.name,
      customerEmail: userData.email,
      customerPhone: userData.phone,
    }

    generateInvoicePDF(orderDetails)
  }

  // Handle review submission
  const handleSubmitReview = () => {
    // In a real app, this would be sent to the server
    setIsReviewSubmitted(true)
    setShowReviewDialog(false)
  }

  // Status mapping
  const statusMap = {
    pending: { label: "Pending Payment", color: "bg-yellow-100 text-yellow-800" },
    paid: { label: "Paid", color: "bg-blue-100 text-blue-800" },
    completed: { label: "Completed", color: "bg-green-100 text-green-800" },
    canceled: { label: "Canceled", color: "bg-gray-100 text-gray-800" },
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 bg-pattern">
        <div className="container">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-green-800">Order Details</h1>
                <Badge className={`${statusMap[order.status].color}`}>{statusMap[order.status].label}</Badge>
              </div>
              <p className="text-muted-foreground">Order ID: {order.id}</p>
            </div>
            <div className="mt-4 flex gap-2 sm:mt-0">
              {order.status === "completed" && (
                <Button
                  variant="outline"
                  className="border-green-200 hover:bg-green-50 hover:border-green-300"
                  onClick={handleDownloadInvoice}
                >
                  <Download className="mr-2 h-4 w-4 text-green-600" />
                  Download Invoice
                </Button>
              )}
              <Link href={`/rooms/${encodeURIComponent(order.roomTitle)}`}>
                <Button className="bg-green-600 hover:bg-green-700">Book Again</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {/* Room Information */}
              <Card className="shadow-elegant overflow-hidden">
                <CardHeader className="pb-2 bg-green-50 border-b">
                  <CardTitle className="text-lg text-green-700">Room Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                    <div>
                      <img
                        src={order.roomImage || "/placeholder.svg"}
                        alt={order.roomTitle}
                        className="h-40 w-full rounded-md object-cover shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-green-800">{order.roomTitle}</h3>
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
                            Total {(new Date(order.checkOut) - new Date(order.checkIn)) / (1000 * 60 * 60 * 24)} nights
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm">
                          <span className="text-gray-500">Room size: </span>
                          {order.roomDetails.area}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Bed type: </span>
                          {order.roomDetails.bedType}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Max guests: </span>
                          {order.roomDetails.maxGuests} people
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Breakfast: </span>
                          {order.roomDetails.breakfast}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card className="shadow-elegant overflow-hidden">
                <CardHeader className="pb-2 bg-green-50 border-b">
                  <CardTitle className="text-lg text-green-700">Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <span className="text-sm">1</span>
                        </div>
                        <div className="h-full w-px bg-green-200"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Order Created</h4>
                        <p className="text-sm text-gray-500">{order.createTime}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <span className="text-sm">2</span>
                        </div>
                        <div className="h-full w-px bg-green-200"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Payment Completed</h4>
                        <p className="text-sm text-gray-500">{order.payTime}</p>
                        <p className="text-sm text-gray-500">Payment method: {order.paymentInfo.method}</p>
                        <p className="text-sm text-gray-500">Transaction ID: {order.paymentInfo.transactionId}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <span className="text-sm">3</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Stay Completed</h4>
                        <p className="text-sm text-gray-500">{order.checkOut}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review Section */}
              {order.status === "completed" && (
                <Card className="shadow-elegant overflow-hidden">
                  <CardHeader className="pb-2 bg-green-50 border-b">
                    <CardTitle className="text-lg text-green-700">
                      {isReviewSubmitted || order.isRated ? "My Review" : "Submit a Review"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {isReviewSubmitted || order.isRated ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < (isReviewSubmitted ? reviewData.rating : order.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            Rating: {isReviewSubmitted ? reviewData.rating : order.rating}/5
                          </span>
                        </div>
                        <p className="text-gray-700">{isReviewSubmitted ? reviewData.comment : order.comment}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">
                          Share your experience with this room to help other travelers make better decisions.
                        </p>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowReviewDialog(true)}>
                          <Star className="mr-2 h-4 w-4" />
                          Write a Review
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {/* Price Details */}
              <Card className="shadow-elegant overflow-hidden">
                <CardHeader className="pb-2 bg-green-50 border-b">
                  <CardTitle className="text-lg text-green-700">Price Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Room rate</span>
                      <span>
                        ${order.price} × {(new Date(order.checkOut) - new Date(order.checkIn)) / (1000 * 60 * 60 * 24)}
                        nights
                      </span>
                    </div>
                    {order.paymentInfo.coupon && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Coupon</span>
                        <span className="text-red-500">-${order.paymentInfo.couponAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cleaning fee</span>
                      <span>$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service fee</span>
                      <span>
                        $
                        {order.paymentInfo.originalPrice -
                          order.price * ((new Date(order.checkOut) - new Date(order.checkIn)) / (1000 * 60 * 60 * 24)) -
                          50}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Original total</span>
                      <span>${order.paymentInfo.originalPrice}</span>
                    </div>
                    {order.paymentInfo.coupon && (
                      <div className="flex justify-between font-bold">
                        <span>Discounted total</span>
                        <span className="text-green-700">${order.totalPrice}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="shadow-elegant overflow-hidden">
                <CardHeader className="pb-2 bg-green-50 border-b">
                  <CardTitle className="text-lg text-green-700">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name</span>
                      <span>{order.contactInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span>{order.contactInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <span>{order.contactInfo.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card className="shadow-elegant overflow-hidden">
                <CardHeader className="pb-2 bg-green-50 border-b">
                  <CardTitle className="text-lg text-green-700">Help & Support</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-200 hover:bg-green-50 hover:border-green-300 text-green-700"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Request Refund
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-200 hover:bg-green-50 hover:border-green-300 text-green-700"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Customer Service
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-200 hover:bg-green-50 hover:border-green-300 text-green-700"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Report an Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>Share your experience about {order.roomTitle}</DialogDescription>
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
  )
}
