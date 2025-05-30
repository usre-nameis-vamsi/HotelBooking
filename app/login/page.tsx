"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    regPhone: "",
    verificationCode: "",
    regPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call with timeout
    setTimeout(() => {
      if (activeTab === "login") {
        // Simple validation
        if (!formData.phone || !formData.password) {
          setError("Please fill in all fields")
          setLoading(false)
          return
        }

        // For demo purposes, accept any credentials
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: "Vamsi Chanumolu",
            phone: formData.phone,
            email: "vamsi.chanumolu@example.com",
            avatar: "https://randomuser.me/api/portraits/men/44.jpg",
            points: 320,
          }),
        )

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event("userDataUpdated"))

        // Redirect to dashboard after login
        router.push("/dashboard")
      } else {
        // Registration validation
        if (!formData.regPhone || !formData.verificationCode || !formData.regPassword || !formData.confirmPassword) {
          setError("Please fill in all fields")
          setLoading(false)
          return
        }

        if (formData.regPassword !== formData.confirmPassword) {
          setError("Passwords do not match")
          setLoading(false)
          return
        }

        // Store registration data and redirect
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: "Vamsi Chanumolu",
            phone: formData.regPhone,
            email: "vamsi.chanumolu@example.com",
            avatar: "https://randomuser.me/api/portraits/men/44.jpg",
            points: 320,
          }),
        )

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event("userDataUpdated"))

        router.push("/dashboard")
      }

      setLoading(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main
        className="flex-1 flex items-center justify-center py-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 backdrop-blur-sm"></div>
        <Card className="mx-auto max-w-md w-full bg-white/95 backdrop-blur-md shadow-elegant relative z-10 border-0">
          <CardHeader className="space-y-1">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-green-700">HB</span>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gradient">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login"
                ? "Login to access your account and bookings"
                : "Join us to start booking amazing homestays"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  {error && (
                    <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-100 animate-fade-in">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-green-200 focus:border-green-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="border-green-200 focus:border-green-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  {error && (
                    <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-100 animate-fade-in">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="regPhone">Phone Number</Label>
                    <Input
                      id="regPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                      value={formData.regPhone}
                      onChange={handleChange}
                      className="border-green-200 focus:border-green-300"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Input
                        id="verificationCode"
                        placeholder="Enter verification code"
                        required
                        value={formData.verificationCode}
                        onChange={handleChange}
                        className="border-green-200 focus:border-green-300"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-green-200 hover:bg-green-50 hover:border-green-300"
                    >
                      Get Code
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regPassword">Password</Label>
                    <Input
                      id="regPassword"
                      type="password"
                      placeholder="Set your password"
                      required
                      value={formData.regPassword}
                      onChange={handleChange}
                      className="border-green-200 focus:border-green-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="border-green-200 focus:border-green-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Registering...
                      </span>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
