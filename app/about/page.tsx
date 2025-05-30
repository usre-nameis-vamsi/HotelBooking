import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, Users, Building, Award, Clock, Heart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Import the back button
import { BackButton } from "@/components/back-button"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Add Back Button in the container */}
        <div className="container pt-8">
          <BackButton className="mb-4" />
        </div>

        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-r from-green-50 to-green-100 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-green-900 sm:text-5xl">
                    About Homestay Booking
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We're on a mission to make travel more personal, comfortable, and memorable through quality homestay
                    experiences.
                  </p>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="About Homestay Booking"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-5xl">Our Story</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  How we started and where we're going
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-8">
              <p className="text-gray-600 mb-4">
                Founded in 2018, Homestay Booking began with a simple idea: travel should feel like coming home. Our
                founders, avid travelers themselves, noticed a gap in the market for authentic, homely accommodations
                that offered the comfort of home with the excitement of travel.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small platform with just 50 listings in three cities has now grown into a global
                network of over 10,000 carefully selected homestays across 100+ destinations. We've helped more than
                500,000 travelers find their perfect home away from home.
              </p>
              <p className="text-gray-600">
                Today, we continue to expand our offerings while maintaining our core values of authenticity, quality,
                and personal connection. We believe that the best travel experiences come from immersing yourself in
                local culture, and there's no better way to do that than staying in a real home with local hosts.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="w-full bg-green-50 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-5xl">Our Values</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The principles that guide everything we do
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Authenticity</h3>
                  <p className="text-center text-sm text-gray-500">
                    We believe in real homes, real hosts, and real experiences that reflect local culture and lifestyle.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Quality</h3>
                  <p className="text-center text-sm text-gray-500">
                    Every homestay on our platform meets our strict standards for cleanliness, comfort, and amenities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Community</h3>
                  <p className="text-center text-sm text-gray-500">
                    We foster meaningful connections between hosts and guests, creating a global community of travelers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-5xl">Our Team</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet the people behind Homestay Booking
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/44.jpg" alt="Vamsi Chanumolu" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">Vamsi Chanumolu</h3>
                <p className="text-sm text-gray-500">CEO & Website Designer</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">Sarah Johnson</h3>
                <p className="text-sm text-gray-500">CTO & Co-founder</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">Michael Chen</h3>
                <p className="text-sm text-gray-500">Head of Operations</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Priya Patel" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">Priya Patel</h3>
                <p className="text-sm text-gray-500">Lead Developer</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/22.jpg" alt="David Kim" />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">David Kim</h3>
                <p className="text-sm text-gray-500">Marketing Director</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/22.jpg" alt="Emma Wilson" />
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">Emma Wilson</h3>
                <p className="text-sm text-gray-500">Customer Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="w-full bg-green-50 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-5xl">Our Achievements</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Milestones we've reached together
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-green-800">10,000+</h3>
                <p className="text-sm text-gray-500">Homestays</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-green-800">500,000+</h3>
                <p className="text-sm text-gray-500">Happy Guests</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-green-800">15+</h3>
                <p className="text-sm text-gray-500">Industry Awards</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-green-800">5 Years</h3>
                <p className="text-sm text-gray-500">Of Excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="w-full bg-green-600 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">Join Our Community</h2>
                <p className="max-w-[900px] text-green-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Become a host or start your journey as a guest
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-green-600 shadow transition-colors hover:bg-green-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Become a Host
                </Link>
                <Link
                  href="/rooms"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Browse Rooms
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
