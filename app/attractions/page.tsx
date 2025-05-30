"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Star, Clock, ExternalLink } from "lucide-react"

// City attractions data
const cityAttractions = {
  Hyderabad: [
    {
      name: "Charminar",
      description: "Historic monument and mosque with four minarets, built in 1591.",
      image:
        "https://images.unsplash.com/photo-1563448927992-9e2e5eba5e7f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.7,
      hours: "9:00 AM - 5:30 PM",
      price: "₹25 for Indians, ₹300 for foreigners",
    },
    {
      name: "Golconda Fort",
      description: "Medieval fort and former diamond trading center with impressive acoustics.",
      image:
        "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.5,
      hours: "8:00 AM - 5:00 PM",
      price: "₹15 for Indians, ₹200 for foreigners",
    },
    {
      name: "Ramoji Film City",
      description: "World's largest film studio complex and popular tourist attraction.",
      image:
        "https://images.unsplash.com/photo-1626196340845-9e97f30e2e60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.3,
      hours: "9:00 AM - 5:30 PM",
      price: "₹1,250 per person",
    },
    {
      name: "Hussain Sagar Lake",
      description: "Heart-shaped lake with a large Buddha statue in the center.",
      image:
        "https://images.unsplash.com/photo-1588416499018-d8c621e1d2c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.2,
      hours: "24 hours",
      price: "Free (boat rides extra)",
    },
  ],
  Goa: [
    {
      name: "Calangute Beach",
      description: "Goa's largest beach, known as the 'Queen of Beaches'.",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.4,
      hours: "24 hours",
      price: "Free",
    },
    {
      name: "Basilica of Bom Jesus",
      description: "UNESCO World Heritage Site containing the remains of St. Francis Xavier.",
      image:
        "https://images.unsplash.com/photo-1582124394776-ebc3e6d25757?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.6,
      hours: "9:00 AM - 6:30 PM",
      price: "Free",
    },
    {
      name: "Fort Aguada",
      description: "17th-century Portuguese fort offering panoramic views of the Arabian Sea.",
      image:
        "https://images.unsplash.com/photo-1586183189334-1ad3cd238e88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.3,
      hours: "8:30 AM - 5:30 PM",
      price: "₹50",
    },
    {
      name: "Dudhsagar Falls",
      description: "Four-tiered waterfall and one of India's tallest waterfalls.",
      image:
        "https://images.unsplash.com/photo-1629397586516-b8be4f62e0bf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.8,
      hours: "7:00 AM - 6:00 PM",
      price: "₹400 per person",
    },
  ],
  Mumbai: [
    {
      name: "Gateway of India",
      description: "Historic arch monument built during the British Raj.",
      image:
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.6,
      hours: "24 hours",
      price: "Free",
    },
    {
      name: "Marine Drive",
      description: "C-shaped boulevard along the coast, also known as the Queen's Necklace.",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.7,
      hours: "24 hours",
      price: "Free",
    },
    {
      name: "Elephanta Caves",
      description: "UNESCO World Heritage Site with ancient cave temples.",
      image:
        "https://images.unsplash.com/photo-1590080552494-dcda538fa459?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.4,
      hours: "9:00 AM - 5:30 PM (Closed on Mondays)",
      price: "₹40 for Indians, ₹600 for foreigners",
    },
    {
      name: "Chhatrapati Shivaji Terminus",
      description: "Historic railway station and UNESCO World Heritage Site.",
      image:
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.5,
      hours: "24 hours (viewing from outside)",
      price: "Free",
    },
  ],
  Sydney: [
    {
      name: "Sydney Opera House",
      description: "Iconic performing arts center and UNESCO World Heritage Site.",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.8,
      hours: "9:00 AM - 5:00 PM",
      price: "AU$42 for guided tour",
    },
    {
      name: "Sydney Harbour Bridge",
      description: "Steel arch bridge across Sydney Harbour, offering bridge climb experiences.",
      image:
        "https://images.unsplash.com/photo-1523428096881-5bd79d043006?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.7,
      hours: "24 hours (Bridge Climb: 9:00 AM - 5:00 PM)",
      price: "Free (Bridge Climb: AU$168-403)",
    },
    {
      name: "Bondi Beach",
      description: "Famous beach known for its golden sand and surfing conditions.",
      image:
        "https://images.unsplash.com/photo-1571781565036-d3f759be73e4?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.6,
      hours: "24 hours",
      price: "Free",
    },
    {
      name: "Taronga Zoo",
      description: "Zoo with Australian native animals and spectacular harbour views.",
      image:
        "https://images.unsplash.com/photo-1590732488817-d0bb7f9a3b82?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.5,
      hours: "9:30 AM - 4:30 PM",
      price: "AU$44 for adults",
    },
  ],
}

// Default attractions for cities without specific data
const defaultAttractions = [
  {
    name: "City Center",
    description: "The historic and cultural heart of the city with shops, restaurants, and landmarks.",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.5,
    hours: "24 hours",
    price: "Free",
  },
  {
    name: "Main Museum",
    description: "The city's premier museum showcasing local history, art, and culture.",
    image:
      "https://images.unsplash.com/photo-1566127992631-137a642a90f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.3,
    hours: "10:00 AM - 6:00 PM (Closed on Mondays)",
    price: "Varies by city",
  },
  {
    name: "Central Park",
    description: "Large urban park offering green space, recreational activities, and events.",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.6,
    hours: "6:00 AM - 10:00 PM",
    price: "Free",
  },
  {
    name: "Local Market",
    description: "Vibrant marketplace selling local produce, crafts, and street food.",
    image: "https://images.unsplash.com/photo-1513125370-3460ebe3401b?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.4,
    hours: "8:00 AM - 6:00 PM",
    price: "Free entry",
  },
]

export default function AttractionsPage() {
  const searchParams = useSearchParams()
  const cityParam = searchParams.get("city")

  const [city, setCity] = useState(cityParam || "Sydney")
  const [attractions, setAttractions] = useState<typeof defaultAttractions>([])

  useEffect(() => {
    // Set attractions based on city
    const cityAtts = cityAttractions[city as keyof typeof cityAttractions] || defaultAttractions
    setAttractions(cityAtts)
  }, [city])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800">Top Attractions in {city}</h1>
            <p className="text-gray-600 mt-2">Explore the best sights and experiences this destination has to offer</p>
          </div>

          {/* City selector */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Select a city:</h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(cityAttractions).map((cityName) => (
                <Button
                  key={cityName}
                  variant={city === cityName ? "default" : "outline"}
                  className={city === cityName ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setCity(cityName)}
                >
                  {cityName}
                </Button>
              ))}
            </div>
          </div>

          {/* Attractions grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {attractions.map((attraction, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{attraction.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{attraction.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{attraction.description}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1 text-green-600" />
                      <span>{attraction.hours}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1 text-green-600" />
                      <span>{city}</span>
                    </div>
                    <div className="font-medium">{attraction.price}</div>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Attractions Map</h2>
            <div
              className="h-[400px] w-full rounded-lg bg-cover bg-center relative"
              style={{
                backgroundImage: `url('${
                  cityAttractions[city as keyof typeof cityAttractions]?.[0]?.image ||
                  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3"
                }')`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-md text-center">
                  <h3 className="font-bold text-lg">Interactive Map Coming Soon</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    We're working on an interactive map feature to help you navigate all attractions in {city}.
                  </p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">Get Directions</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
