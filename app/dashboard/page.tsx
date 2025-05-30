"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Home, MapPin, Package, Settings, Star } from "lucide-react"

// Import the user utilities and back button
import { getUserData } from "@/utils/user-events"
import { BackButton } from "@/components/back-button"

export default function Dashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState(getUserData())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Get user data
    setUserData(getUserData())
    setIsLoading(false)
  }, [router])

  // Add a window event listener to detect localStorage changes
  useEffect(() => {
    const handleUserDataUpdate = () => {
      setUserData(getUserData())
    }

    window.addEventListener("userDataUpdated", handleUserDataUpdate)

    return () => {
      window.removeEventListener("userDataUpdated", handleUserDataUpdate)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="animate-pulse text-green-600 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          {/* Add Back Button */}
          <BackButton className="mb-6" />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800">Welcome back, {userData.name}!</h1>
            <p className="text-gray-600 mt-2">Here's an overview of your account and recent activity.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* User Profile Summary */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{userData.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{userData.email || "No email provided"}</p>
                <p className="text-sm text-gray-500">{userData.phone || "No phone provided"}</p>

                <div className="flex items-center mt-4 bg-green-50 px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium">{userData.points} Reward Points</span>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full mt-6">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </Link>
                  <Link href="/coupons">
                    <Button className="w-full bg-green-600 hover:bg-green-700">My Coupons</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Manage your bookings and favorites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Link href="/rooms">
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                      <Home className="h-8 w-8 text-green-600 mb-2" />
                      <span className="text-sm font-medium">Browse Rooms</span>
                    </div>
                  </Link>
                  <Link href="/orders">
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                      <Package className="h-8 w-8 text-green-600 mb-2" />
                      <span className="text-sm font-medium">My Bookings</span>
                    </div>
                  </Link>
                  <Link href="/favorites">
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                      <Heart className="h-8 w-8 text-green-600 mb-2" />
                      <span className="text-sm font-medium">Favorites</span>
                    </div>
                  </Link>
                  <Link href="/map">
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                      <MapPin className="h-8 w-8 text-green-600 mb-2" />
                      <span className="text-sm font-medium">Map View</span>
                    </div>
                  </Link>
                  <Link href="/profile#settings">
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                      <Settings className="h-8 w-8 text-green-600 mb-2" />
                      <span className="text-sm font-medium">Settings</span>
                    </div>
                  </Link>
                  <div
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem("isLoggedIn")
                      localStorage.removeItem("userData")
                      router.push("/login")
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-red-500 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="text-sm font-medium">Sign Out</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent bookings and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="bookings">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
                    <TabsTrigger value="viewed">Recently Viewed</TabsTrigger>
                    <TabsTrigger value="favorites">New Favorites</TabsTrigger>
                  </TabsList>

                  <TabsContent value="bookings" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                          <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                            alt="Room"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Classic Courtyard Homestay</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Oct 25 - Oct 28, 2023</span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</Badge>
                      </div>

                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                          <img
                            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                            alt="Room"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Luxury Ocean View Suite</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Nov 5 - Nov 8, 2023</span>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Upcoming</Badge>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="viewed" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center p-3 border rounded-lg">
                          <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                            <img
                              src={`https://images.unsplash.com/photo-${1580000000000 + i * 1000}?q=80&w=400&auto=format&fit=crop`}
                              alt="Room"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Modern City Apartment {i}</h4>
                            <p className="text-xs text-gray-500">Viewed 2 hours ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="favorites" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center p-3 border rounded-lg">
                          <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                            <img
                              src={
                                i === 1
                                  ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                                  : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                              }
                              alt="Room"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {i === 1 ? "Classic Courtyard Homestay" : "Modern City Apartment"}
                            </h4>
                            <p className="text-xs text-gray-500">Added to favorites yesterday</p>
                          </div>
                          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
