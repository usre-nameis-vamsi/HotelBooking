"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Navigation, Search, Star, Loader } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { SimpleMap } from "@/components/simple-map"

// Import the back button
import { BackButton } from "@/components/back-button"

// Define city data with coordinates and images
const cities = [
  {
    name: "Hyderabad",
    country: "India",
    coordinates: "17.3850° N, 78.4867° E",
    image:
      "https://images.unsplash.com/photo-1563448927992-9e2e5eba5e7f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Goa",
    country: "India",
    coordinates: "15.2993° N, 74.1240° E",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Mumbai",
    country: "India",
    coordinates: "19.0760° N, 72.8777° E",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Bangalore",
    country: "India",
    coordinates: "12.9716° N, 77.5946° E",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Maldives",
    country: "Maldives",
    coordinates: "3.2028° N, 73.2207° E",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "New York",
    country: "USA",
    coordinates: "40.7128° N, 74.0060° W",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "London",
    country: "UK",
    coordinates: "51.5074° N, 0.1278° W",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Tokyo",
    country: "Japan",
    coordinates: "35.6762° N, 139.6503° E",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Paris",
    country: "France",
    coordinates: "48.8566° N, 2.3522° E",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Sydney",
    country: "Australia",
    coordinates: "33.8688° S, 151.2093° E",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Rome",
    country: "Italy",
    coordinates: "41.9028° N, 12.4964° E",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Dubai",
    country: "UAE",
    coordinates: "25.2048° N, 55.2708° E",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
]

// Real homestay images for each city
const cityHomestayImages = {
  Hyderabad: [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Goa: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Mumbai: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Bangalore: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Maldives: [
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  "New York": [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  London: [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Tokyo: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Paris: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Sydney: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Rome: [
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
  Dubai: [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ],
}

// Generate nearby homestays data for a city
const generateNearbyHomestays = (cityName: string) => {
  const cityImages = cityHomestayImages[cityName as keyof typeof cityHomestayImages] || []

  return Array(5)
    .fill(null)
    .map((_, index) => ({
      id: `${cityName.toLowerCase()}-${index + 1}`,
      title: `${cityName} ${["Luxury Suite", "City View Apartment", "Cozy Homestay", "Modern Studio", "Deluxe Villa"][index % 5]}`,
      image: cityImages[index] || "/placeholder.svg?height=80&width=80",
      rating: (4 + Math.random()).toFixed(1),
      reviews: Math.floor(Math.random() * 100) + 10,
      distance: ((index + 1) * 0.5).toFixed(1),
      price: Math.floor(Math.random() * 300) + 100,
    }))
}

export default function MapPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [mapView, setMapView] = useState<"roadmap" | "satellite">("roadmap")
  const [nearbyHomestays, setNearbyHomestays] = useState(generateNearbyHomestays(cities[0].name))
  const [isLocating, setIsLocating] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Filter cities based on search term
  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Update nearby homestays when selected city changes
  useEffect(() => {
    setNearbyHomestays(generateNearbyHomestays(selectedCity.name))
  }, [selectedCity])

  // Handle city selection
  const handleCitySelect = (city: (typeof cities)[0]) => {
    setSelectedCity(city)
  }

  // Handle search
  const handleSearch = () => {
    const foundCity = cities.find(
      (city) =>
        city.name.toLowerCase() === searchTerm.toLowerCase() || city.country.toLowerCase() === searchTerm.toLowerCase(),
    )

    if (foundCity) {
      setSelectedCity(foundCity)
    }
  }

  // Handle view all homestays
  const handleViewAllHomestays = () => {
    // Navigate to rooms page with city filter
    router.push(`/rooms?city=${encodeURIComponent(selectedCity.name)}`)
  }

  // Handle explore attractions
  const handleExploreAttractions = () => {
    // Navigate to attractions page for the selected city
    router.push(`/attractions?city=${encodeURIComponent(selectedCity.name)}`)
  }

  // Handle locate me functionality
  const handleLocateMe = () => {
    setIsLocating(true)

    // Show toast to indicate process started
    toast({
      title: "Locating you...",
      description: "Please wait while we find your current location",
    })

    // Simulate geolocation process
    setTimeout(() => {
      // In a real app, we would use the browser's geolocation API
      // For demo purposes, we'll simulate finding a location near the selected city

      // Parse coordinates from string (e.g., "17.3850° N, 78.4867° E")
      const coordParts = selectedCity.coordinates.split(", ")
      let lat = Number.parseFloat(coordParts[0].split("°")[0])
      let lng = Number.parseFloat(coordParts[1].split("°")[0])

      // Add small random offset to simulate user being nearby
      lat += (Math.random() - 0.5) * 0.1
      lng += (Math.random() - 0.5) * 0.1

      // Set user location
      setUserLocation({ lat, lng })
      setIsLocating(false)

      // Show success toast
      toast({
        title: "Location found!",
        description: `You are near ${selectedCity.name}. Showing nearby homestays.`,
        variant: "default",
      })
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          {/* Add Back Button */}
          <BackButton className="mb-4" />

          <div className="mb-6 space-y-2">
            <h1 className="text-3xl font-bold text-green-800">Room Locations</h1>
            <p className="text-muted-foreground">
              View homestay locations, learn about the surroundings and transportation
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full max-w-xs">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="search" className="text-sm font-medium">
                        Search Location
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="search"
                          placeholder="Enter address or homestay name"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button size="icon" className="bg-green-600 hover:bg-green-700" onClick={handleSearch}>
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Popular Cities</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Hyderabad", "Goa", "Mumbai", "Bangalore", "Maldives", "Dubai"].map((city) => (
                          <Button
                            key={city}
                            variant="outline"
                            size="sm"
                            className={`h-8 ${selectedCity.name === city ? "bg-green-100 border-green-600 text-green-700" : ""}`}
                            onClick={() => {
                              const cityData = cities.find((c) => c.name === city)
                              if (cityData) handleCitySelect(cityData)
                            }}
                          >
                            {city}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">International Cities</h3>
                      <div className="flex flex-wrap gap-2">
                        {["New York", "London", "Tokyo", "Paris", "Sydney", "Rome"].map((city) => (
                          <Button
                            key={city}
                            variant="outline"
                            size="sm"
                            className={`h-8 ${selectedCity.name === city ? "bg-green-100 border-green-600 text-green-700" : ""}`}
                            onClick={() => {
                              const cityData = cities.find((c) => c.name === city)
                              if (cityData) handleCitySelect(cityData)
                            }}
                          >
                            {city}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Nearby Homestays in {selectedCity.name}</h3>
                      <div className="space-y-2">
                        {nearbyHomestays.map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <div className="grid grid-cols-[80px_1fr] gap-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt="Homestay image"
                                className="h-20 w-20 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg?height=80&width=80"
                                }}
                              />
                              <div className="py-2 pr-2">
                                <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                                <div className="mt-1 flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs text-gray-500">
                                    {item.rating} ({item.reviews} reviews)
                                  </span>
                                </div>
                                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin className="h-3 w-3 text-green-600" />
                                  <span className="line-clamp-1">{item.distance} miles from center</span>
                                </div>
                                <div className="mt-1 text-sm font-bold text-green-700">${item.price}</div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              <Card className="h-[calc(100vh-16rem)]">
                <Tabs
                  defaultValue="roadmap"
                  value={mapView}
                  onValueChange={(value) => setMapView(value as "roadmap" | "satellite")}
                >
                  <div className="flex items-center justify-between border-b px-4 py-2">
                    <div className="flex items-center">
                      <TabsList>
                        <TabsTrigger value="roadmap">Map</TabsTrigger>
                        <TabsTrigger value="satellite">Satellite</TabsTrigger>
                      </TabsList>
                      <div className="ml-4 text-sm">
                        <span className="font-medium">{selectedCity.name}</span>
                        <span className="text-gray-500 ml-2">{selectedCity.coordinates}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8" onClick={handleLocateMe} disabled={isLocating}>
                      {isLocating ? (
                        <>
                          <Loader className="mr-1 h-4 w-4 animate-spin" />
                          Locating...
                        </>
                      ) : (
                        <>
                          <Navigation className="mr-1 h-4 w-4" />
                          Locate Me
                        </>
                      )}
                    </Button>
                  </div>
                  <TabsContent value="roadmap" className="h-full">
                    <SimpleMap type="roadmap" cityName={selectedCity.name} userLocation={userLocation} />
                  </TabsContent>
                  <TabsContent value="satellite" className="h-full">
                    <SimpleMap type="satellite" cityName={selectedCity.name} userLocation={userLocation} />
                  </TabsContent>
                </Tabs>
              </Card>

              {/* City Information */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3">
                      <img
                        src={selectedCity.image || "/placeholder.svg"}
                        alt={selectedCity.name}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold">
                        {selectedCity.name}, {selectedCity.country}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {selectedCity.name} is a popular destination with {nearbyHomestays.length} homestays available.
                        The average price for accommodation is $
                        {Math.round(
                          nearbyHomestays.reduce((sum, item) => sum + item.price, 0) / nearbyHomestays.length,
                        )}{" "}
                        per night.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleViewAllHomestays}>
                          View All Homestays
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleExploreAttractions}>
                          Explore Attractions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
