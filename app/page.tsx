import Link from "next/link"
import Image from "next/image"
import { Music, Play, Headphones, Users, Upload, Globe, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">SoundWave</span>
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#artists"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              For Artists
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-32">
          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Discover & Share <span className="text-primary">Music</span> You Love
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The ultimate platform for music lovers and artists. Stream, discover, and share your favorite
                    tracks.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2">
                      Get Started <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"></div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Music App Interface"
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button size="icon" className="h-16 w-16 rounded-full">
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/40 py-12">
          <div className="container">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">20M+</h3>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">50M+</h3>
                <p className="text-sm text-muted-foreground">Tracks</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">250K+</h3>
                <p className="text-sm text-muted-foreground">Artists</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">190+</h3>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Everything You Need in One Place
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Discover why millions of music lovers and artists choose SoundWave
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-0 bg-transparent shadow-none transition-all hover:bg-accent/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Headphones className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Unlimited Streaming</h3>
                  <p className="text-muted-foreground">
                    Stream millions of tracks in high quality, create playlists, and discover new music.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-transparent shadow-none transition-all hover:bg-accent/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Social Experience</h3>
                  <p className="text-muted-foreground">
                    Follow friends, share your favorite tracks, and see what others are listening to.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-transparent shadow-none transition-all hover:bg-accent/50">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Artist Platform</h3>
                  <p className="text-muted-foreground">
                    Upload your music, build your fanbase, and track your performance with detailed analytics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="relative order-2 md:order-1">
                <div className="absolute -left-10 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="App Interface"
                    width={800}
                    height={600}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-6 order-1 md:order-2">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Designed for the Best Experience</h2>
                  <p className="text-muted-foreground">
                    Our intuitive interface makes it easy to discover, play, and share music. With personalized
                    recommendations and curated playlists, you'll always find something new to love.
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Personalized recommendations based on your taste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Create and share playlists with friends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Offline listening for premium subscribers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>High-quality audio streaming</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* For Artists Section */}
        <section id="artists" className="py-20">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">For Artists, By Artists</h2>
                  <p className="text-muted-foreground">
                    Upload your music, connect with fans, and grow your audience. Our platform provides everything you
                    need to succeed as an independent artist.
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Easy music uploads with detailed metadata</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Detailed analytics and listener insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Direct fan engagement and messaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Fair revenue sharing and transparent payments</span>
                  </li>
                </ul>
                <div>
                  <Link href="/artist/upload">
                    <Button className="gap-2">
                      Start Uploading <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -right-10 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Artist Dashboard"
                    width={800}
                    height={600}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
              <p className="text-muted-foreground">Join thousands of satisfied users and artists on SoundWave</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg?height=48&width=48" alt="User" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Music Lover</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "SoundWave has completely changed how I discover music. The recommendations are spot on, and I love
                    the social features that let me see what my friends are listening to."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg?height=48&width=48" alt="User" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Alex Rivera</h4>
                      <p className="text-sm text-muted-foreground">Independent Artist</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "As an independent artist, SoundWave has been instrumental in growing my audience. The analytics
                    help me understand my listeners, and the upload process is seamless."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg?height=48&width=48" alt="User" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Jamie Chen</h4>
                      <p className="text-sm text-muted-foreground">Premium Subscriber</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "The sound quality is amazing, and I love being able to download tracks for offline listening. Worth
                    every penny of my premium subscription!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Plan</h2>
              <p className="text-muted-foreground">Flexible plans for listeners and artists</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-muted-foreground">For casual listeners</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Ad-supported listening</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Basic audio quality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Limited skips</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Mobile app access</span>
                    </li>
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full">
                      Sign Up Free
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-primary">
                <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-primary text-xs font-medium text-primary-foreground">
                  <div className="absolute bottom-1 left-0 right-0 text-center">Popular</div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">Premium</h3>
                    <p className="text-muted-foreground">For music enthusiasts</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Ad-free listening</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>High-quality audio</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Unlimited skips</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Offline listening</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>All platform features</span>
                    </li>
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full">Get Premium</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">Artist Pro</h3>
                    <p className="text-muted-foreground">For creators</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$19.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>All Premium features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Unlimited uploads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Promotional tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full">
                      Start Creating
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Start Your Musical Journey?
              </h2>
              <p className="mb-8 text-primary-foreground/80 md:text-xl">
                Join millions of music lovers and artists on SoundWave today.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Sign Up Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Global Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Global Community</h2>
                  <p className="text-muted-foreground">
                    Join a worldwide community of music lovers and artists. Discover sounds from every corner of the
                    globe and connect with people who share your passion.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/signup">
                    <Button className="gap-2">
                      Join the Community <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -right-10 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="relative">
                  <Globe className="h-full w-full text-muted-foreground/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">190+</h3>
                      <p>Countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center space-x-2">
                <Music className="h-6 w-6 text-primary" />
                <span className="inline-block font-bold">SoundWave</span>
              </Link>
              <p className="mb-4 text-sm text-muted-foreground">Discover, stream, and share music you love.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    For Artists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Copyright
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SoundWave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

