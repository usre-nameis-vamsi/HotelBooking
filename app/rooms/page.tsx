"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HotelCard } from "@/components/hotel-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search } from "lucide-react"

// Import the back button
import { BackButton } from "@/components/back-button"

// Mock room data
const allRooms = [
  {
    id: 1,
    title: "Luxury Ocean View Suite",
    description: "Enjoy magnificent ocean views and luxurious amenities for an unforgettable vacation experience.",
    price: 698,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Sanya Bay",
    type: "Luxury Suite",
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Refrigerator", "Kitchen", "Pool"],
  },
  {
    id: 2,
    title: "Modern City Apartment",
    description: "A modern apartment located in the city center, close to shopping and entertainment areas.",
    price: 458,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Shanghai Downtown",
    type: "Double Room",
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Washing Machine"],
  },
  {
    id: 3,
    title: "Classic Courtyard Homestay",
    description:
      "Experience a perfect blend of traditional culture and modern amenities in this courtyard-style homestay.",
    price: 528,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Lijiang Old Town",
    type: "Family Suite",
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Kitchen", "Parking"],
  },
  {
    id: 4,
    title: "Mountain View Villa",
    description:
      "A villa surrounded by mountains, offering a peaceful natural environment and comfortable accommodation.",
    price: 888,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Hangzhou West Lake",
    type: "Luxury Suite",
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Refrigerator", "Kitchen", "Pool", "Parking"],
  },
  {
    id: 5,
    title: "Industrial Style Studio",
    description: "Modern industrial style studio apartment, stylish and minimalist, perfect for business travel.",
    price: 358,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Beijing Chaoyang",
    type: "Single Room",
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Refrigerator"],
  },
  {
    id: 6,
    title: "Japanese Minimalist Homestay",
    description:
      "Simple Japanese style, providing a quiet and comfortable living environment, suitable for leisure vacations.",
    price: 428,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    location: "Suzhou Gardens",
    type: "Double Room",
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Washing Machine", "Kitchen"],
  },
]

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([500])
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [filteredRooms, setFilteredRooms] = useState(allRooms)

  // Apply filters when any filter changes
  useEffect(() => {
    let results = allRooms

    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        (room) =>
          room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply price filter
    results = results.filter((room) => room.price <= priceRange[0])

    // Apply room type filter
    if (selectedRoomTypes.length > 0) {
      results = results.filter((room) => selectedRoomTypes.includes(room.type))
    }

    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      results = results.filter((room) => selectedAmenities.every((amenity) => room.amenities.includes(amenity)))
    }

    setFilteredRooms(results)
  }, [searchTerm, priceRange, selectedRoomTypes, selectedAmenities])

  // Toggle room type selection
  const toggleRoomType = (type: string) => {
    setSelectedRoomTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          {/* Add Back Button */}
          <BackButton className="mb-4" />

          <h1 className="mb-6 text-3xl font-bold text-green-800">Browse Rooms</h1>

          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            {/* Filter sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Search</h3>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Enter keywords"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button size="icon" className="bg-green-600 hover:bg-green-700">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Price Range</h3>
                    <Slider
                      defaultValue={[500]}
                      max={2000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>$0</span>
                      <span>${priceRange[0]}</span>
                      <span>$2000+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Room Type</h3>
                    <div className="space-y-2">
                      {["Single Room", "Double Room", "Family Suite", "Luxury Suite"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedRoomTypes.includes(type)}
                            onCheckedChange={() => toggleRoomType(type)}
                          />
                          <Label htmlFor={`type-${type}`} className="text-sm">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Amenities</h3>
                    <div className="space-y-2">
                      {[
                        "Wi-Fi",
                        "Air Conditioning",
                        "TV",
                        "Refrigerator",
                        "Washing Machine",
                        "Kitchen",
                        "Parking",
                        "Pool",
                      ].map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                          <Checkbox
                            id={`facility-${facility}`}
                            checked={selectedAmenities.includes(facility)}
                            onCheckedChange={() => toggleAmenity(facility)}
                          />
                          <Label htmlFor={`facility-${facility}`} className="text-sm">
                            {facility}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Room list */}
            <div className="space-y-6">
              <Tabs defaultValue="grid">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Found {filteredRooms.length} rooms</span>
                  </div>
                  <TabsList>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="grid" className="mt-6">
                  {filteredRooms.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredRooms.map((room) => (
                        <HotelCard
                          key={room.id}
                          title={room.title}
                          description={room.description}
                          price={room.price}
                          rating={room.rating}
                          image={room.image}
                          location={room.location}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
                      <Search className="h-12 w-12 text-gray-300" />
                      <h3 className="mt-4 text-lg font-medium">No Rooms Found</h3>
                      <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to find more options</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="list" className="mt-6">
                  {filteredRooms.length > 0 ? (
                    <div className="space-y-4">
                      {filteredRooms.map((room) => (
                        <Card key={room.id} className="overflow-hidden">
                          <div className="grid md:grid-cols-[250px_1fr]">
                            <img
                              src={room.image || "/placeholder.svg"}
                              alt={room.title}
                              className="h-48 w-full object-cover md:h-full"
                            />
                            <div className="p-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-lg">{room.title}</h3>
                                  <div className="text-lg font-bold text-green-700">${room.price}/night</div>
                                </div>
                                <p className="text-sm text-gray-500">{room.location}</p>
                                <p className="text-sm text-gray-600">{room.description}</p>
                                <div className="flex justify-end">
                                  <Button className="bg-green-600 hover:bg-green-700">View Details</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed">
                      <Search className="h-12 w-12 text-gray-300" />
                      <h3 className="mt-4 text-lg font-medium">No Rooms Found</h3>
                      <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to find more options</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
