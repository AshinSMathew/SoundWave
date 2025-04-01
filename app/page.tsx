import Link from "next/link"
import Image from "next/image"
import { Music, Play, Headphones, Users, Upload, Globe, ChevronRight, Sparkles, Shield, Zap } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background/90">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <span className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              SoundWave
            </span>
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
              <Button variant="ghost" size="sm" className="rounded-full px-4">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="rounded-full px-4">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <Sparkles className="mr-1 h-3.5 w-3.5" />
                    The future of music streaming
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Discover & Share <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Music</span> You Love
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The ultimate platform for music lovers and artists. Stream, discover, and share your favorite
                    tracks with a global community.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2 rounded-full px-8">
                      Get Started <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="rounded-full px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"></div>
                <div className="relative aspect-square overflow-hidden rounded-3xl border shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Music App Interface"
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button size="icon" className="h-20 w-20 rounded-full bg-primary/90 hover:bg-primary shadow-lg">
                      <Play className="h-10 w-10 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/40 py-12">
          <div className="container">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">20M+</h3>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">50M+</h3>
                <p className="text-sm text-muted-foreground">Tracks</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">250K+</h3>
                <p className="text-sm text-muted-foreground">Artists</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">190+</h3>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                <Zap className="mr-1 h-3.5 w-3.5" />
                Powerful Features
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Everything You Need in One Place
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Discover why millions of music lovers and artists choose SoundWave
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-6 rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <Headphones className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Unlimited Streaming</h3>
                  <p className="text-muted-foreground">
                    Stream millions of tracks in high quality, create playlists, and discover new music tailored to your taste.
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-6 rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Social Experience</h3>
                  <p className="text-muted-foreground">
                    Follow friends, share your favorite tracks, and see what others are listening to in real-time.
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-6 rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Artist Platform</h3>
                  <p className="text-muted-foreground">
                    Upload your music, build your fanbase, and track your performance with detailed analytics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="relative order-2 md:order-1">
                <div className="absolute -left-10 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-xl">
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
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary self-start mb-2">
                  <Shield className="mr-1 h-3.5 w-3.5" />
                  Premium Experience
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Designed for the Best Experience</h2>
                  <p className="text-muted-foreground">
                    Our intuitive interface makes it easy to discover, play, and share music. With personalized
                    recommendations and curated playlists, you'll always find something new to love.
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Personalized recommendations based on your taste</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Create and share playlists with friends</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Offline listening for premium subscribers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>High-quality audio streaming</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/signup">
                    <Button className="rounded-full px-6">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Artists Section */}
        <section id="artists" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary self-start mb-2">
                  <Music className="mr-1 h-3.5 w-3.5" />
                  For Musicians
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">For Artists, By Artists</h2>
                  <p className="text-muted-foreground">
                    Upload your music, connect with fans, and grow your audience. Our platform provides everything you
                    need to succeed as an independent artist.
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Easy music uploads with detailed metadata</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Detailed analytics and listener insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Direct fan engagement and messaging</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Fair revenue sharing and transparent payments</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/artist/upload">
                    <Button className="gap-2 rounded-full px-6">
                      Start Uploading <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -right-10 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-xl">
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
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                <Users className="mr-1 h-3.5 w-3.5" />
                Testimonials
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
              <p className="text-muted-foreground">Join thousands of satisfied users and artists on SoundWave</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20">
                      <Image src="/placeholder.svg?height=56&width=56" alt="User" fill className="object-cover" />
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

              <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20">
                      <Image src="/placeholder.svg?height=56&width=56" alt="User" fill className="object-cover" />
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

              <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20">
                      <Image src="/placeholder.svg?height=56&width=56" alt="User" fill className="object-cover" />
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
        <section id="pricing" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                <Zap className="mr-1 h-3.5 w-3.5" />
                Pricing Plans
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Plan</h2>
              <p className="text-muted-foreground">Flexible plans for listeners and artists</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-muted-foreground">For casual listeners</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Ad-supported listening</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Basic audio quality</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Limited skips</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Mobile app access</span>
                    </li>
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full rounded-full">
                      Sign Up Free
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-primary bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 scale-105">
                <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-primary text-xs font-medium text-primary-foreground">
                  <div className="absolute bottom-1 left-0 right-0 text-center">Popular</div>
                </div>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">Premium</h3>
                    <p className="text-muted-foreground">For music enthusiasts</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Ad-free listening</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>High-quality audio</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Unlimited skips</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Offline listening</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>All platform features</span>
                    </li>
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full rounded-full">Get Premium</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">Artist Pro</h3>
                    <p className="text-muted-foreground">For creators</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$19.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>All Premium features</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Unlimited uploads</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Promotional tools</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-1">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full rounded-full">
                      Start Creating
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
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
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto rounded-full px-8">
                    Sign Up Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto rounded-full px-8"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
        </section>

        {/* Global Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary self-start mb-2">
                  <Globe className="mr-1 h-3.5 w-3.5" />
                  Global Reach
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Global Community</h2>
                  <p className="text-muted-foreground">
                    Join a worldwide community of music lovers and artists. Discover sounds from every corner of the
                    globe and connect with people who share your passion.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row pt-4">
                  <Link href="/signup">
                    <Button className="gap-2 rounded-full px-6">
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
                    <div className="text-center bg-card/30 backdrop-blur-sm p-6 rounded-full border border-border/50">
                      <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">190+</h3>
                      <p>Countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center space-x-2 group">
                <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Music className="h-5 w-5 text-primary" />
                </div>
                <span className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  SoundWave
                </span>
              </Link>
              <p className="mb-4 text-sm text-muted-foreground">Discover, stream, and share music you love.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    For Artists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
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