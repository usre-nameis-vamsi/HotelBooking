"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Smartphone, Building, Tag, X } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [upiId, setUpiId] = useState("")
  const [bankAccount, setBankAccount] = useState({
    accountNumber: "",
    ifscCode: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [showCouponDialog, setShowCouponDialog] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null)
  const [appliedDiscount, setAppliedDiscount] = useState(0)

  // Get booking details from URL params
  const roomId = searchParams.get("roomId") || "1"
  const roomTitle = searchParams.get("title") || "Luxury Ocean View Suite"
  const checkIn = searchParams.get("checkIn") || "2023-11-15"
  const checkOut = searchParams.get("checkOut") || "2023-11-18"
  const price = Number(searchParams.get("price")) || 698

  // Calculate nights and total
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
  const roomTotal = price * nights
  const cleaningFee = 50
  const serviceFee = Math.round(roomTotal * 0.1)
  const originalTotal = roomTotal + cleaningFee + serviceFee
  const total = originalTotal - appliedDiscount

  // Available coupons
  const coupons = [
    { id: 1, amount: 50, minAmount: 200, code: "WELCOME50" },
    { id: 2, amount: 100, minAmount: 500, code: "SAVE100" },
    { id: 3, amount: 150, minAmount: 1000, code: "SPECIAL150" },
  ]

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setCardDetails((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleProceedToPay = () => {
    // Validate payment details based on selected method
    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert("Please fill in all card details")
        return
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        alert("Please enter your UPI ID")
        return
      }
    } else if (paymentMethod === "netbanking") {
      if (!bankAccount.accountNumber || !bankAccount.ifscCode) {
        alert("Please fill in all bank details")
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtpDialog(true)
    }, 1500)
  }

  const handleVerifyOtp = () => {
    if (!otp) {
      setOtpError("Please enter OTP")
      return
    }

    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits")
      return
    }

    setIsProcessing(true)

    // Simulate OTP verification
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtpDialog(false)
      setShowSuccessAnimation(true)

      // Redirect after payment success
      setTimeout(() => {
        router.push("/payment-success?orderId=ORD" + Date.now().toString().slice(-8))
      }, 3000)
    }, 1500)
  }

  const handleApplyCoupon = (couponId: number) => {
    const coupon = coupons.find((c) => c.id === couponId)
    if (coupon && originalTotal >= coupon.minAmount) {
      setSelectedCoupon(couponId)
      setAppliedDiscount(coupon.amount)
      setShowCouponDialog(false)
    }
  }

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null)
    setAppliedDiscount(0)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-6xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-green-800">Payment</h1>
            <p className="text-gray-600">Complete your booking by making a payment</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Payment Methods */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                      <TabsTrigger value="upi">UPI/PhonePe</TabsTrigger>
                      <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={handleCardInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Smith"
                          value={cardDetails.cardName}
                          onChange={handleCardInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={handleCardInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" value={cardDetails.cvv} onChange={handleCardInputChange} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-500">Your card details are secure and encrypted</span>
                      </div>
                    </TabsContent>

                    <TabsContent value="upi" className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID / PhonePe Number</Label>
                        <Input
                          id="upiId"
                          placeholder="username@upi or phone number"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50">
                          <Smartphone className="h-8 w-8 text-green-600 mb-2" />
                          <span className="text-sm">PhonePe</span>
                        </div>
                        <div className="flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
                            alt="UPI"
                            className="h-8 w-8 mb-2"
                          />
                          <span className="text-sm">UPI</span>
                        </div>
                        <div className="flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:bg-green-50">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png"
                            alt="Google Pay"
                            className="h-8 w-8 mb-2"
                          />
                          <span className="text-sm">Google Pay</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="netbanking" className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="Enter your account number"
                          value={bankAccount.accountNumber}
                          onChange={(e) => setBankAccount((prev) => ({ ...prev, accountNumber: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          placeholder="Enter IFSC code"
                          value={bankAccount.ifscCode}
                          onChange={(e) => setBankAccount((prev) => ({ ...prev, ifscCode: e.target.value }))}
                        />
                      </div>
                      <div className="mt-4">
                        <Label>Select Your Bank</Label>
                        <RadioGroup defaultValue="sbi" className="mt-2 grid grid-cols-2 gap-4">
                          {["SBI", "HDFC", "ICICI", "Axis", "PNB", "BOB"].map((bank) => (
                            <div
                              key={bank}
                              className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-green-50"
                            >
                              <RadioGroupItem value={bank.toLowerCase()} id={bank.toLowerCase()} />
                              <Label htmlFor={bank.toLowerCase()} className="flex items-center gap-2 cursor-pointer">
                                <Building className="h-4 w-4 text-green-600" />
                                {bank} Bank
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="h-24 w-24 rounded-md overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt={roomTitle}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{roomTitle}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        Check-in: {checkIn} | Check-out: {checkOut}
                      </div>
                      <div className="text-sm text-gray-500">
                        Duration: {nights} {nights === 1 ? "night" : "nights"}
                      </div>
                      <div className="text-sm font-medium text-green-700 mt-1">${price} per night</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ${price} × {nights} nights
                      </span>
                      <span>${roomTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span>${cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span>${serviceFee}</span>
                    </div>

                    {selectedCoupon ? (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Discount</span>
                          <Badge variant="hotel-success" className="text-xs">
                            {coupons.find((c) => c.id === selectedCoupon)?.code}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <span className="text-red-500">-${appliedDiscount}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-1 text-gray-400 hover:text-red-500"
                            onClick={handleRemoveCoupon}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => setShowCouponDialog(true)}
                      >
                        <Tag className="mr-2 h-4 w-4" />
                        Apply Coupon
                      </Button>
                    )}

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-xl text-green-700">${total}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleProceedToPay}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Proceed to Pay"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* OTP Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Payment</DialogTitle>
            <DialogDescription>Enter the OTP sent to your registered mobile number</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password (OTP)</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value)
                  setOtpError("")
                }}
              />
              {otpError && <p className="text-sm text-red-500">{otpError}</p>}
            </div>
            <div className="text-sm text-gray-500">For demo purposes, you can enter any 6-digit number</div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOtpDialog(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleVerifyOtp} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
              {isProcessing ? "Verifying..." : "Verify OTP"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Coupon Dialog */}
      <Dialog open={showCouponDialog} onOpenChange={setShowCouponDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Available Coupons</DialogTitle>
            <DialogDescription>Select a coupon to apply to your booking</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-green-50 ${
                  originalTotal < coupon.minAmount ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => originalTotal >= coupon.minAmount && handleApplyCoupon(coupon.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{coupon.code}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Save ${coupon.amount} on orders above ${coupon.minAmount}
                    </p>
                  </div>
                  {originalTotal < coupon.minAmount ? (
                    <Badge variant="outline" className="text-xs">
                      Not Eligible
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600"
                      onClick={() => handleApplyCoupon(coupon.id)}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCouponDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Animation */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your booking has been confirmed.</p>
            <div className="animate-pulse text-green-600">Redirecting...</div>
          </div>
        </div>
      )}
    </div>
  )
}
