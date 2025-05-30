"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Star } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface HotelCardProps {
  title: string
  description: string
  price: number
  rating: number
  image: string
  location: string
  tags?: string[]
}

export function HotelCard({ title, description, price, rating, image, location, tags }: HotelCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Check if this hotel is in favorites when component mounts
  useEffect(() => {
    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem("userFavorites") || "[]")
      const isInFavorites = favorites.some((fav: any) => fav.title === title)
      setIsFavorite(isInFavorites)
    }

    loadFavorites()

    // Listen for favorites updates
    window.addEventListener("favoritesUpdated", loadFavorites)

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites)
    }
  }, [title])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Prevent event bubbling

    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("userFavorites") || "[]")

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav: any) => fav.title !== title)
      localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites))
      setIsFavorite(false)
      toast({
        title: "Removed from favorites",
        description: `${title} has been removed from your favorites`,
      })
    } else {
      // Add to favorites
      const newFavorite = {
        title,
        description,
        price,
        rating,
        image,
        location,
        addedOn: new Date().toISOString(),
      }
      localStorage.setItem("userFavorites", JSON.stringify([...favorites, newFavorite]))
      setIsFavorite(true)
      toast({
        title: "Added to favorites",
        description: `${title} has been added to your favorites`,
      })
    }

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("favoritesUpdated"))
  }

  return (
    <Card
      variant="hotel"
      className="overflow-hidden hotel-card-hover group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className={`h-full w-full object-cover transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-70" : "opacity-0"}`}
          ></div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 rounded-full bg-white/90 text-red-500 hover:bg-white hover:text-red-600 shadow-sm transition-transform duration-300 hover:scale-110"
          onClick={toggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
        {tags && tags.length > 0 && (
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="hotel-success" className="text-xs bg-green-600/90 text-white">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-green-800 line-clamp-1">{title}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4 text-green-600" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-green-50 p-4">
        <div className="flex items-end">
          <span className="text-xl font-bold text-green-700">${price}</span>
          <span className="text-sm text-gray-500">/night</span>
        </div>
        <Link
          href={`/rooms/${encodeURIComponent(title)}`}
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:bg-green-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}
