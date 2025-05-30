"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, Calendar, Download, Home } from "lucide-react"
import { generateReceiptPDF } from "@/utils/pdf-generator"
import { BackButton } from "@/components/back-button"
import { getUserData } from "@/utils/user-events"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "ORD12345678"
  const userData = getUserData()

  const [countdown, setCountdown] = useState(10)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Create order details object for PDF generation
  const orderDetails = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    roomTitle: searchParams.get("title") || "Luxury Suite",
    checkIn: searchParams.get("checkIn") || "2023-11-15",
    checkOut: searchParams.get("checkOut") || "2023-11-18",
    price: Number(searchParams.get("price")) || 698,
    nights: Number(searchParams.get("nights")) || 3,
    roomTotal: Number(searchParams.get("roomTotal")) || 2094,
    cleaningFee: Number(searchParams.get("cleaningFee")) || 50,
    serviceFee: Number(searchParams.get("serviceFee")) || 100,
    total: Number(searchParams.get("total")) || 2244,
    customerName: userData.name,
    customerEmail: userData.email,
    customerPhone: userData.phone,
  }

  // Handle receipt download
  const handleDownloadReceipt = () => {
    generateReceiptPDF(orderDetails)
  }

  useEffect(() => {
    // Start animation sequence
    setTimeout(() => {
      setAnimationComplete(true)
    }, 1500)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      router.push("/orders")
    }
  }, [countdown, router])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 bg-pattern">
        <div className="container max-w-md">
          {/* Add Back Button */}
          <BackButton className="mb-6" />

          <Card className="text-center shadow-elegant overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 py-6">
              <div className="relative mx-auto mb-4">
                {/* PhonePe-like success animation */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
                  {/* Ripple effect */}
                  <div
                    className={`absolute inset-0 ${animationComplete ? "animate-none" : "animate-ping"} bg-green-100 rounded-full`}
                  ></div>
                  <div
                    className={`absolute inset-2 ${animationComplete ? "animate-none" : "animate-ping"} bg-green-200 rounded-full delay-75`}
                  ></div>
                  <div
                    className={`absolute inset-4 ${animationComplete ? "animate-none" : "animate-ping"} bg-green-300 rounded-full delay-150`}
                  ></div>

                  {/* Check mark with animation */}
                  <div
                    className={`relative z-10 ${animationComplete ? "scale-100" : "scale-0"} transition-transform duration-500 ease-out`}
                  >
                    <Check
                      className={`h-12 w-12 text-green-600 ${animationComplete ? "" : "opacity-0"} transition-opacity duration-300 delay-300`}
                    />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl text-white">Payment Successful!</CardTitle>
              <CardDescription className="text-green-100">Your booking has been confirmed</CardDescription>
            </div>
            <CardContent className="space-y-6 p-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-medium text-lg">{orderId}</p>
              </div>

              <div className="text-left space-y-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Confirmed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{userData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Time:</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="p-4 border border-dashed rounded-lg bg-green-50">
                <p className="text-sm text-gray-600">
                  A confirmation email has been sent to your registered email address with all booking details.
                </p>
              </div>

              <div className="text-sm text-gray-500 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <span className="font-bold text-green-700">{countdown}</span>
                </div>
                Redirecting to orders in {countdown} seconds...
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 p-6 bg-gray-50 border-t">
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button
                  variant="outline"
                  className="w-full border-green-200 hover:bg-green-50 hover:border-green-300"
                  onClick={handleDownloadReceipt}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
                <Link href="/orders" className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Booking
                  </Button>
                </Link>
              </div>
              <Link href="/" className="w-full">
                <Button variant="ghost" className="w-full hover:bg-green-50">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
