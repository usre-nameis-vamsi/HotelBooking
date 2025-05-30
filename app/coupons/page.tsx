"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Coins, Tag } from "lucide-react"
import { AuthCheck } from "@/components/auth-check"
// Import the back button
import { BackButton } from "@/components/back-button"

// Mock coupon data
const availableCoupons = [
  { id: 1, amount: 50, minAmount: 200, points: 100, validUntil: "2023-12-31" },
  { id: 2, amount: 100, minAmount: 400, points: 200, validUntil: "2023-12-31" },
  { id: 3, amount: 150, minAmount: 600, points: 300, validUntil: "2023-12-31" },
  { id: 4, amount: 200, minAmount: 800, points: 400, validUntil: "2023-12-31" },
  { id: 5, amount: 300, minAmount: 1000, points: 500, validUntil: "2023-12-31" },
]

// Mock user data
const user = {
  points: 320,
}

export default function CouponsPage() {
  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 py-8">
          <div className="container">
            {/* Add Back Button */}
            <BackButton className="mb-4" />

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-green-800">Coupon Center</h1>
              <p className="text-muted-foreground">Exchange points for coupons to use when paying for orders</p>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Coupons</CardTitle>
                    <CardDescription>Exchange points for the following coupons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {availableCoupons.map((coupon) => (
                        <Card
                          key={coupon.id}
                          className="relative overflow-hidden bg-gradient-to-r from-green-50 to-green-100"
                        >
                          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-green-100" />
                          <CardContent className="p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Tag className="h-5 w-5 text-green-600" />
                                  <h3 className="font-bold text-xl text-green-800">${coupon.amount} Coupon</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Valid for orders over ${coupon.minAmount}
                                </p>
                                <p className="text-sm text-muted-foreground">Valid until: {coupon.validUntil}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-sm text-green-600">
                                  <Coins className="h-4 w-4" />
                                  {coupon.points} points
                                </div>
                                <Button
                                  variant="outline"
                                  className="border-green-600 text-green-600 hover:bg-green-50"
                                  disabled={user.points < coupon.points}
                                >
                                  Redeem Now
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>My Points</CardTitle>
                    <CardDescription>View and use your points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Coins className="h-8 w-8 text-green-600" />
                      <span className="text-3xl font-bold text-green-700">{user.points}</span>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="mb-2 font-medium">How to earn points?</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-4 w-4 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xs">
                              1
                            </div>
                            <span>Share rooms: Earn 10 points per share</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-4 w-4 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xs">
                              2
                            </div>
                            <span>Complete orders: 1% of the amount spent converts to points</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-4 w-4 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xs">
                              3
                            </div>
                            <span>Review orders: Earn 20 points per review</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>My Coupons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="available" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="available">Available</TabsTrigger>
                        <TabsTrigger value="used">Used</TabsTrigger>
                      </TabsList>
                      <TabsContent value="available" className="mt-4 space-y-4">
                        <Card className="relative overflow-hidden bg-gradient-to-r from-green-50 to-green-100">
                          <CardContent className="p-4">
                            <div className="space-y-1">
                              <h3 className="font-bold text-green-800">$50 Coupon</h3>
                              <p className="text-xs text-muted-foreground">Valid for orders over $200</p>
                              <p className="text-xs text-muted-foreground">Valid until: 2023-12-31</p>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="used" className="mt-4">
                        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                          <p className="text-sm text-muted-foreground">No used coupons</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </AuthCheck>
  )
}
