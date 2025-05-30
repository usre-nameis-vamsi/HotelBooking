"use client"

import type React from "react"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function Footer() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check login status when component mounts
    const loginStatus = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loginStatus)
  }, [])

  const handleProtectedLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    if (isLoggedIn) {
      router.push(path)
    } else {
      router.push("/login")
    }
  }

  return (
    <footer className="w-full border-t bg-background py-6 md:py-10">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-green-600">Homestay Booking</h3>
          <p className="text-sm text-gray-500">
            Providing high-quality accommodation experiences to make your travels more comfortable and enjoyable.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-sm text-gray-500 hover:text-green-600">
                Home
              </Link>
              <p className="text-xs text-gray-400">Discover our featured rooms and special offers</p>
            </li>
            <li>
              <Link href="/rooms" className="text-sm text-gray-500 hover:text-green-600">
                Browse Rooms
              </Link>
              <p className="text-xs text-gray-400">Explore our full selection of accommodations</p>
            </li>
            <li>
              <Link href="/map" className="text-sm text-gray-500 hover:text-green-600">
                Map View
              </Link>
              <p className="text-xs text-gray-400">Find rooms by location and explore the surroundings</p>
            </li>
            <li>
              <Link href="/about" className="text-sm text-gray-500 hover:text-green-600">
                About Us
              </Link>
              <p className="text-xs text-gray-400">Learn about our story, mission and values</p>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">User Services</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/login" className="text-sm text-gray-500 hover:text-green-600">
                Login/Register
              </Link>
              <p className="text-xs text-gray-400">Access your account or create a new one</p>
            </li>
            <li>
              {isLoggedIn ? (
                <Link href="/profile" className="text-sm text-gray-500 hover:text-green-600">
                  My Account
                </Link>
              ) : (
                <a
                  href="#"
                  onClick={(e) => handleProtectedLink(e, "/login")}
                  className="text-sm text-gray-500 hover:text-green-600"
                >
                  Login and View Your Account
                </a>
              )}
              <p className="text-xs text-gray-400">Manage your profile and personal information</p>
            </li>
            <li>
              {isLoggedIn ? (
                <Link href="/orders" className="text-sm text-gray-500 hover:text-green-600">
                  Order Management
                </Link>
              ) : (
                <a
                  href="#"
                  onClick={(e) => handleProtectedLink(e, "/login")}
                  className="text-sm text-gray-500 hover:text-green-600"
                >
                  Login to Manage Orders
                </a>
              )}
              <p className="text-xs text-gray-400">View and manage your bookings and reservations</p>
            </li>
            <li>
              {isLoggedIn ? (
                <Link href="/coupons" className="text-sm text-gray-500 hover:text-green-600">
                  Coupons
                </Link>
              ) : (
                <a
                  href="#"
                  onClick={(e) => handleProtectedLink(e, "/login")}
                  className="text-sm text-gray-500 hover:text-green-600"
                >
                  Login to Access Coupons
                </a>
              )}
              <p className="text-xs text-gray-400">Redeem points for discounts on your next stay</p>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-500">Email: contact@example.com</li>
            <li className="text-sm text-gray-500">Phone: 400-123-4567</li>
            <li className="text-sm text-gray-500">Address: 123 Main Street, New York, NY</li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-6">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Homestay Booking. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
