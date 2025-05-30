"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Home, LogIn, MapPin, Menu, Search, ShoppingBag, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { getUserData } from "@/utils/user-events"

export function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(getUserData())
  const [scrolled, setScrolled] = useState(false)

  // Check login status when component mounts
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loginStatus)

    // Set initial user data
    setUserData(getUserData())

    // Listen for user data updates
    const handleUserDataUpdate = () => {
      setUserData(getUserData())
    }

    window.addEventListener("userDataUpdated", handleUserDataUpdate)

    // Handle scroll for transparent header effect
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("userDataUpdated", handleUserDataUpdate)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-r-green-200">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl text-green-700">Homestay Booking</SheetTitle>
                <SheetDescription>Explore quality accommodations, book with ease</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-green-600"
                >
                  <Home className="h-5 w-5 text-green-600" />
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-green-600"
                >
                  <Search className="h-5 w-5 text-green-600" />
                  Browse Rooms
                </Link>
                <Link
                  href="/map"
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-green-600"
                >
                  <MapPin className="h-5 w-5 text-green-600" />
                  Map View
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-green-600"
                >
                  <Heart className="h-5 w-5 text-green-600" />
                  My Favorites
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-green-600"
                >
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                  My Orders
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-gradient">Homestay Booking</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-green-600 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/rooms" className="text-sm font-medium transition-colors hover:text-green-600 relative group">
              Browse Rooms
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/map" className="text-sm font-medium transition-colors hover:text-green-600 relative group">
              Map View
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/coupons" className="text-sm font-medium transition-colors hover:text-green-600 relative group">
              Coupons
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative group">
                  <Avatar className="ring-2 ring-offset-2 ring-green-100 group-hover:ring-green-200 transition-all">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-green-100 text-green-700">{userData.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center gap-2 cursor-pointer">
                    <ShoppingBag className="h-4 w-4" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites" className="flex items-center gap-2 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    My Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/login")}
              className="border-green-200 hover:border-green-300 hover:bg-green-50"
            >
              <LogIn className="mr-2 h-4 w-4 text-green-600" />
              Login/Register
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
