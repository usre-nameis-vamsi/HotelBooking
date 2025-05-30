"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CalendarCheck, Heart, MapPin, Share2, Star, Wifi, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Import the back button
import { BackButton } from "@/components/back-button"

// Room data mapping
const roomsData = {
  "Luxury Ocean View Suite": {
    id: 1,
    title: "Luxury Ocean View Suite",
    description:
      "Enjoy magnificent ocean views and luxurious amenities for an unforgettable vacation experience. Our luxury ocean view suite is located on the top floor, offering 180-degree unobstructed ocean views, where you can enjoy the sunrise and sunset every day. The suite is equipped with high-end furniture and facilities, including a king-size bed, luxury bathroom amenities, private balcony, and lounge area.",
    price: 698,
    rating: 4.9,
    reviews: 128,
    location: "Sanya Bay",
    host: "Mr. Johnson",
    hostAvatar: "/placeholder.svg?height=50&width=50",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  "Modern City Apartment": {
    id: 2,
    title: "Modern City Apartment",
    description:
      "A modern apartment located in the city center, close to shopping and entertainment areas. This stylish apartment features contemporary design, open-concept living space, and all the amenities you need for a comfortable urban stay.",
    price: 458,
    rating: 4.7,
    reviews: 95,
    location: "Shanghai Downtown",
    host: "Ms. Zhang",
    hostAvatar: "/placeholder.svg?height=50&width=50",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  "Classic Courtyard Homestay": {
    id: 3,
    title: "Classic Courtyard Homestay",
    description:
      "Experience a perfect blend of traditional culture and modern amenities in this courtyard-style homestay. This authentic courtyard home offers a peaceful retreat with traditional architecture, beautiful garden views, and modern comforts.",
    price: 528,
    rating: 4.8,
    reviews: 112,
    location: "Lijiang Old Town",
    host: "Mr. Li",
    hostAvatar: "/placeholder.svg?height=50&width=50",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  "Mountain View Villa": {
    id: 4,
    title: "Mountain View Villa",
    description:
      "A villa surrounded by mountains, offering a peaceful natural environment and comfortable accommodation. This spacious villa features panoramic mountain views, private garden, outdoor seating areas, and luxury amenities for a perfect retreat.",
    price: 888,
    rating: 4.9,
    reviews: 87,
    location: "Hangzhou West Lake",
    host: "Ms. Chen",
    hostAvatar: "/placeholder.svg?height=50&width=50",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  "Industrial Style Studio": {
    id: 5,
    title: "Industrial Style Studio",
    description:
      "Modern industrial style studio apartment, stylish and minimalist, perfect for business travel. This trendy studio features exposed brick walls, high ceilings, modern furnishings, and a fully equipped workspace.",
    price: 358,
    rating: 4.6,
    reviews: 76,
    location: "Beijing Chaoyang",
    host: "Mr. Wang",
    hostAvatar: "/placeholder.svg?height=50&width=50",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  "Japanese Minimalist Homestay": {
    id: 6,
    title: "Japanese Minimalist Homestay",
    description:
      "Simple Japanese style, providing a quiet and comfortable living environment, suitable for leisure vacations. This zen-inspired space features tatami mats, sliding paper doors, minimalist decor, and a peaceful garden view.",
    price: 428,
    rating: 4.7,
    reviews: 92,
    location: "Suzhou Gardens",
    host: "Ms. Liu",
    hostAvatar: "/placeholder.svg?height=50&width=50",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1536405528985-b5a6a6806038?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
}

// Common amenities for all rooms
const commonAmenities = [
  { name: "Wi-Fi", icon: Wifi },
  { name: "Air Conditioning", icon: Wifi },
  { name: "TV", icon: Wifi },
  { name: "Refrigerator", icon: Wifi },
  { name: "Washing Machine", icon: Wifi },
  { name: "Kitchen", icon: Wifi },
  { name: "Parking", icon: Wifi },
  { name: "Pool", icon: Wifi },
]

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showMapDialog, setShowMapDialog] = useState(false)

  // Get room details based on ID or title
  const decodedId = decodeURIComponent(params.id)
  const roomDetails = roomsData[decodedId as keyof typeof roomsData] || Object.values(roomsData)[0]

  // Calculate total price if dates are selected
  const nights =
    selectedDates.from && selectedDates.to
      ? Math.round((selectedDates.to.getTime() - selectedDates.from.getTime()) / (1000 * 60 * 60 * 24))
      : 0
  const roomTotal = roomDetails.price * nights
  const cleaningFee = nights > 0 ? 100 : 0
  const serviceFee = nights > 0 ? 50 : 0
  const total = roomTotal + cleaningFee + serviceFee

  const handleBookNow = () => {
    if (!selectedDates.from || !selectedDates.to) {
      alert("Please select check-in and check-out dates")
      return
    }

    // Format dates for URL
    const checkIn = selectedDates.from.toISOString().split("T")[0]
    const checkOut = selectedDates.to.toISOString().split("T")[0]

    // Redirect to payment page with booking details
    router.push(
      `/payment?roomId=${roomDetails.id}&title=${encodeURIComponent(roomDetails.title)}&price=${roomDetails.price}&checkIn=${checkIn}&checkOut=${checkOut}`,
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          {/* Add Back Button */}
          <BackButton className="mb-4" />

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800">{roomDetails.title}</h1>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">{roomDetails.rating}</span>
                  <span className="ml-1 text-gray-500">({roomDetails.reviews} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-1 h-4 w-4 text-green-600" />
                  {roomDetails.location}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Room images */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-1 row-span-2 md:col-span-2 lg:col-span-2 lg:row-span-2">
              <Image
                src={roomDetails.images[0] || "/placeholder.svg"}
                alt={roomDetails.title}
                width={800}
                height={600}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            {roomDetails.images.slice(1).map((image, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${roomDetails.title} ${index + 1}`}
                  width={400}
                  height={300}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              {/* Room description */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-green-800">Room Description</h2>
                <p className="text-gray-600">{roomDetails.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-green-800">Amenities & Services</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {commonAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <amenity.icon className="h-5 w-5 text-green-600" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-green-800">Guest Reviews</h2>
                  <Link href="#" className="text-sm text-green-600 hover:underline">
                    View all {roomDetails.reviews} reviews
                  </Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? "men" : "women"}/${index + 10}.jpg`}
                                alt="Guest profile"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">Guest {index + 1}</p>
                              <p className="text-xs text-gray-500">October 2023</p>
                            </div>
                          </div>
                          <div className="mt-2 flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            The room was very clean, facilities were complete, location was great, and surrounding
                            amenities were excellent. Highly recommended.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-green-800">Location</h2>
                <div
                  className="h-80 rounded-lg border p-4 bg-cover bg-center cursor-pointer"
                  style={{
                    backgroundImage:
                      "url('https://maps.googleapis.com/maps/api/staticmap?center=" +
                      encodeURIComponent(roomDetails.location) +
                      "&zoom=14&size=800x400&key=YOUR_API_KEY')",
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=2031&auto=format&fit=crop')",
                  }}
                  onClick={() => setShowMapDialog(true)}
                >
                  <div className="flex h-full items-center justify-center bg-black/30 rounded-lg">
                    <Button className="bg-white text-green-700 hover:bg-gray-100">
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Exact address will be provided after booking confirmation.</p>
              </div>
            </div>

            {/* Booking card */}
            <div className="md:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-700">${roomDetails.price}</div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                  <Tabs defaultValue="calendar" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="calendar">Calendar</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="calendar" className="mt-4">
                      <Calendar
                        mode="range"
                        selected={selectedDates}
                        onSelect={(range) =>
                          setSelectedDates(range as { from: Date | undefined; to: Date | undefined })
                        }
                        className="rounded-md border"
                        disabled={(date) => date < new Date()}
                      />
                      {!selectedDates.from && !selectedDates.to && (
                        <div className="mt-2 flex items-center text-amber-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>Please select check-in and check-out dates</span>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="details" className="mt-4 space-y-4">
                      <div className="space-y-2">
                        {nights > 0 ? (
                          <>
                            <div className="flex items-center justify-between text-sm">
                              <span>
                                ${roomDetails.price} x {nights} nights
                              </span>
                              <span>${roomTotal}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Cleaning fee</span>
                              <span>${cleaningFee}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Service fee</span>
                              <span>${serviceFee}</span>
                            </div>
                            <div className="border-t pt-2">
                              <div className="flex items-center justify-between font-bold">
                                <span>Total</span>
                                <span>${total}</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-32 items-center justify-center text-center text-gray-500">
                            <div>
                              <CalendarCheck className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                              <p>Select dates to see prices</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                  <Button
                    className="mt-4 w-full bg-green-600 hover:bg-green-700"
                    onClick={handleBookNow}
                    disabled={!selectedDates.from || !selectedDates.to}
                  >
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    You won't be charged yet, payment will be processed after booking confirmation
                  </p>

                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => setShowCancelDialog(true)}
                    >
                      Cancel Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your booking? This action cannot be undone.
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
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowCancelDialog(false)
                // Show confirmation
                alert("Booking has been cancelled successfully")
              }}
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Location Map</DialogTitle>
            <DialogDescription>
              {roomDetails.title} is located in {roomDetails.location}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div
              className="h-[400px] w-full rounded-lg bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=2031&auto=format&fit=crop')",
              }}
            >
              <div className="flex h-full items-center justify-center">
                <Badge className="bg-green-600 text-white px-3 py-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {roomDetails.location}
                </Badge>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">Nearby Attractions:</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
                  City Center - 1.2 km
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
                  Beach - 0.5 km
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
                  Shopping Mall - 2.0 km
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
                  Airport - 15 km
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowMapDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
