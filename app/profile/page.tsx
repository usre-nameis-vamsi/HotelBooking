"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Package, Settings, Star, Tag, User, Upload, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { AuthCheck } from "@/components/auth-check"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Import the user utilities
import { getUserData, updateUserData } from "@/utils/user-events"
import { BackButton } from "@/components/back-button"

// Update the ProfilePage component
export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState(getUserData())
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // For review functionality
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewData, setReviewData] = useState({
    orderId: "",
    roomTitle: "",
    rating: 5,
    comment: "",
  })

  useEffect(() => {
    // Get user data from localStorage
    const currentUserData = getUserData()
    setUserData(currentUserData)
    setFormData({
      name: currentUserData.name || "Vamsi Chanumolu",
      phone: currentUserData.phone || "13800138000",
      email: currentUserData.email || "vamsi.chanumolu@example.com",
    })

    // Listen for user data updates
    const handleUserDataUpdate = () => {
      const updatedData = getUserData()
      setUserData(updatedData)
      setFormData({
        name: updatedData.name || "Vamsi Chanumolu",
        phone: updatedData.phone || "13800138000",
        email: updatedData.email || "vamsi.chanumolu@example.com",
      })
    }

    window.addEventListener("userDataUpdated", handleUserDataUpdate)

    return () => {
      window.removeEventListener("userDataUpdated", handleUserDataUpdate)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Update handleSaveChanges to use updateUserData
  const handleSaveChanges = () => {
    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Update user data
      const updatedUserData = {
        ...userData,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      }

      if (previewUrl) {
        updatedUserData.avatar = previewUrl
      }

      // Save to localStorage and trigger update event
      updateUserData(updatedUserData)

      // Update state
      setUserData(updatedUserData)
      setIsLoading(false)
      setShowSuccess(true)

      // Show success message
      toast({
        title: "Profile updated successfully",
        description: "Your profile information has been saved.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  // Add a function to remove avatar
  const handleRemoveAvatar = () => {
    setPreviewUrl(null)
    setSelectedFile(null)

    // Update user data with default avatar
    const updatedUserData = {
      ...userData,
      avatar: "/placeholder.svg?height=100&width=100",
    }

    // Save to localStorage and trigger update event
    updateUserData(updatedUserData)

    toast({
      title: "Avatar removed",
      description: "Your profile picture has been removed.",
    })
  }

  // Open review dialog
  const handleOpenReview = (orderId: string, roomTitle: string) => {
    setReviewData({
      orderId,
      roomTitle,
      rating: 5,
      comment: "",
    })
    setShowReviewDialog(true)
  }

  // Submit review
  const handleSubmitReview = () => {
    // Save review to localStorage
    const reviews = JSON.parse(localStorage.getItem("userReviews") || "[]")
    reviews.push(reviewData)
    localStorage.setItem("userReviews", JSON.stringify(reviews))

    // Update orders to mark as reviewed
    const orders = JSON.parse(localStorage.getItem("userOrders") || "[]")
    const updatedOrders = orders.map((order: any) => {
      if (order.id === reviewData.orderId) {
        return {
          ...order,
          isRated: true,
          rating: reviewData.rating,
          comment: reviewData.comment,
        }
      }
      return order
    })
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders))

    // Close dialog and show success message
    setShowReviewDialog(false)
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
      action: <ToastAction altText="Close">Close</ToastAction>,
    })
  }

  // View order details
  const handleViewOrderDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`)
  }

  // Add password change functionality
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [id.replace("password-", "")]: value,
    }))
  }

  const handleUpdatePassword = () => {
    // Validate passwords
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would verify the current password against stored password
    // For demo purposes, we'll just update it

    // Save new password to localStorage
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials") || "{}")
    userCredentials.password = passwordData.newPassword
    localStorage.setItem("userCredentials", JSON.stringify(userCredentials))

    // Show success message
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully",
    })

    // Clear password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Add account security edit functionality
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [securityFormData, setSecurityFormData] = useState({
    phone: userData.phone,
    email: userData.email,
  })

  useEffect(() => {
    setSecurityFormData({
      phone: userData.phone,
      email: userData.email,
    })
  }, [userData.phone, userData.email])

  const handleSecurityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setSecurityFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleUpdateSecurity = (field: "phone" | "email") => {
    const updatedUserData = {
      ...userData,
      [field]: securityFormData[field],
    }

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUserData))

    // Update state
    setUserData(updatedUserData)
    setFormData((prev) => ({
      ...prev,
      [field]: securityFormData[field],
    }))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("userDataUpdated"))

    // Show success message
    toast({
      title: `${field.charAt(0).toUpperCase() + field.slice(1)} updated`,
      description: `Your ${field} has been updated successfully`,
    })

    // Reset editing state
    if (field === "phone") setIsEditingPhone(false)
    if (field === "email") setIsEditingEmail(false)
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 py-8">
          <div className="container grid gap-8 md:grid-cols-[240px_1fr]">
            {/* Add Back Button */}
            <div className="md:col-span-2">
              <BackButton />
            </div>

            {/* Sidebar */}
            <aside className="hidden md:block">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback>{userData.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground">Points: {userData.points}</p>
                    </div>
                  </div>
                  <nav className="mt-6 flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start" asChild>
                      <a href="#profile">
                        <User className="mr-2 h-4 w-4 text-green-600" />
                        Personal Info
                      </a>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <a href="#orders">
                        <Package className="mr-2 h-4 w-4 text-green-600" />
                        My Orders
                      </a>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <a href="#favorites">
                        <Heart className="mr-2 h-4 w-4 text-green-600" />
                        My Favorites
                      </a>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <a href="#coupons">
                        <Tag className="mr-2 h-4 w-4 text-green-600" />
                        My Coupons
                      </a>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <a href="#settings">
                        <Settings className="mr-2 h-4 w-4 text-green-600" />
                        Account Settings
                      </a>
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main content area */}
            <div className="space-y-8">
              <Card id="profile">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>View and edit your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                      <Avatar className="h-24 w-24 relative group">
                        <AvatarImage src={previewUrl || userData.avatar} alt={userData.name} />
                        <AvatarFallback>{userData.name.slice(0, 2)}</AvatarFallback>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                          <label htmlFor="avatar-upload" className="cursor-pointer">
                            <Upload className="h-6 w-6 text-white" />
                            <input
                              id="avatar-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium">{userData.name}</h3>
                        <p className="text-sm text-muted-foreground">Update your avatar and personal information</p>
                        <div className="flex gap-2">
                          <label
                            htmlFor="avatar-upload"
                            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                          >
                            Change Avatar
                            <input
                              id="avatar-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                          <Button variant="outline" size="sm" onClick={handleRemoveAvatar}>
                            Remove Avatar
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Username</Label>
                          <Input id="name" value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
                      </div>
                      <div className="flex items-center gap-4">
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={handleSaveChanges}
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                        {showSuccess && (
                          <div className="flex items-center text-green-600">
                            <Check className="h-4 w-4 mr-1" />
                            <span>Changes saved successfully!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card id="orders">
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>View all your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="canceled">Canceled</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4 space-y-4">
                      {[1, 2, 3].map((order) => (
                        <Card key={order}>
                          <CardContent className="p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">Luxury Ocean View Suite</h3>
                                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    Completed
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">Order ID: ORD12345678{order}</p>
                                <p className="text-sm text-muted-foreground">
                                  Stay: 2023-10-0{order} to 2023-10-0{order + 2}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewOrderDetails(`ORD12345678${order}`)}
                                >
                                  View Details
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenReview(`ORD12345678${order}`, "Luxury Ocean View Suite")}
                                >
                                  <Star className="mr-1 h-4 w-4" />
                                  Review
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                    <TabsContent value="pending" className="mt-4">
                      <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">No pending orders</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="completed" className="mt-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">Luxury Ocean View Suite</h3>
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                  Completed
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">Order ID: ORD123456781</p>
                              <p className="text-sm text-muted-foreground">Stay: 2023-10-01 to 2023-10-03</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewOrderDetails("ORD123456781")}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenReview("ORD123456781", "Luxury Ocean View Suite")}
                              >
                                <Star className="mr-1 h-4 w-4" />
                                Review
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="canceled" className="mt-4">
                      <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">No canceled orders</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card id="favorites">
                <CardHeader>
                  <CardTitle>My Favorites</CardTitle>
                  <CardDescription>View your saved rooms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                      <Card key={item} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={`https://images.unsplash.com/photo-${1566073771259 + item * 1000}?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3`}
                            alt="Room image"
                            className="h-40 w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 rounded-full bg-white/80 text-red-500 hover:bg-white hover:text-red-600"
                          >
                            <Heart className="h-5 w-5 fill-red-500" />
                            <span className="sr-only">Remove from favorites</span>
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold">Japanese Minimalist Homestay {item}</h3>
                            <p className="text-sm text-muted-foreground">Suzhou Gardens</p>
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-green-700">${428}/night</div>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card id="coupons">
                <CardHeader>
                  <CardTitle>My Coupons</CardTitle>
                  <CardDescription>View and redeem coupons</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">My Points: {userData.points}</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn more points by sharing rooms and completing orders
                      </p>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">Redeem Coupon</Button>
                  </div>
                  <div className="space-y-4">
                    {[1, 2].map((coupon) => (
                      <Card
                        key={coupon}
                        className="relative overflow-hidden bg-gradient-to-r from-green-50 to-green-100"
                      >
                        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-green-100" />
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Tag className="h-5 w-5 text-green-600" />
                                <h3 className="font-bold text-xl text-green-800">${coupon * 50} Coupon</h3>
                              </div>
                              <p className="text-sm text-muted-foreground">Valid for orders over ${coupon * 200}</p>
                              <p className="text-sm text-muted-foreground">Valid until: 2023-12-31</p>
                            </div>
                            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                              Use Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card id="settings">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account and security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password-currentPassword">Current Password</Label>
                          <Input
                            id="password-currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password-newPassword">New Password</Label>
                          <Input
                            id="password-newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password-confirmPassword">Confirm New Password</Label>
                          <Input
                            id="password-confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                      </div>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={handleUpdatePassword}>
                        Update Password
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Account Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          {isEditingPhone ? (
                            <div className="space-y-2 w-full mr-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input id="phone" value={securityFormData.phone} onChange={handleSecurityInputChange} />
                            </div>
                          ) : (
                            <div>
                              <p className="font-medium">Phone Number</p>
                              <p className="text-sm text-muted-foreground">{userData.phone}</p>
                            </div>
                          )}
                          {isEditingPhone ? (
                            <div className="flex gap-2 items-end">
                              <Button variant="outline" size="sm" onClick={() => setIsEditingPhone(false)}>
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleUpdateSecurity("phone")}
                              >
                                Save
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => setIsEditingPhone(true)}>
                              Edit
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          {isEditingEmail ? (
                            <div className="space-y-2 w-full mr-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={securityFormData.email}
                                onChange={handleSecurityInputChange}
                              />
                            </div>
                          ) : (
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-sm text-muted-foreground">{userData.email}</p>
                            </div>
                          )}
                          {isEditingEmail ? (
                            <div className="flex gap-2 items-end">
                              <Button variant="outline" size="sm" onClick={() => setIsEditingEmail(false)}>
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleUpdateSecurity("email")}
                              >
                                Save
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => setIsEditingEmail(true)}>
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />

        {/* Review Dialog */}
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>Share your experience about {reviewData.roomTitle}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= reviewData.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Your Review</Label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Share your experience with this room..."
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSubmitReview}
                disabled={!reviewData.comment}
              >
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AuthCheck>
  )
}
