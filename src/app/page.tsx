import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Keyboard,
  BookOpen,
  Code,
  Zap,
  Target,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  TrendingUp,
  Globe,
  Cpu,
} from "lucide-react"
import Link from "next/link"

export default function FluentypeLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-amber-500 rounded-lg flex items-center justify-center">
              <Keyboard className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-200 to-amber-500 bg-clip-text text-transparent">
              FluenType
            </span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium text-white hover:text-yellow-400 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-white hover:text-yellow-400 transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium text-white hover:text-yellow-400 transition-colors">
            About
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500"
          >
            Sign In
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-yellow-400/10" />
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <Badge className="bg-yellow-100 text-black border border-yellow-300">
                  🚀 Master Typing, English & Coding Together
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Type Your Way to
                  <br />
                  <span className="text-black">Fluency & Code</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The only platform that combines typing speed training with English learning and coding practice. Build
                  muscle memory while mastering languages and programming concepts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-yellow-400 flex-1 border border-yellow-400/20"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-500 flex-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-gray-700">Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-gray-700">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-gray-700">10,000+ active learners</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge className="bg-yellow-400 text-black">Three Skills, One Platform</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Everything You Need to Excel
              </h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Fluentype uniquely combines typing mastery with language learning and coding education. Progress in all
                three areas simultaneously with our integrated approach.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Typing Speed */}
              <Card className="border-2 border-yellow-400/20 hover:border-yellow-400 transition-colors group bg-black/50 backdrop-blur">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-black" />
                  </div>
                  <CardTitle className="text-xl text-white">Typing Speed Mastery</CardTitle>
                  <CardDescription className="text-gray-300">
                    Boost your WPM with advanced training techniques and real-time feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Target className="h-4 w-4 text-yellow-400" />
                      <span>Personalized speed goals</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <TrendingUp className="h-4 w-4 text-yellow-400" />
                      <span>Progress tracking & analytics</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="h-4 w-4 text-yellow-400" />
                      <span>Competitive leaderboards</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500"
                  >
                    Start Typing Practice
                  </Button>
                </CardContent>
              </Card>

              {/* English Learning */}
              <Card className="border-2 border-yellow-400/20 hover:border-yellow-400 transition-colors group bg-black/50 backdrop-blur">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-8 w-8 text-black" />
                  </div>
                  <CardTitle className="text-xl text-white">English Through Typing</CardTitle>
                  <CardDescription className="text-gray-300">
                    Learn vocabulary, grammar, and sentence structure while you type
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Globe className="h-4 w-4 text-yellow-400" />
                      <span>Interactive vocabulary lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>Grammar exercises</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                      <span>Pronunciation guides</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500"
                  >
                    Learn English
                  </Button>
                </CardContent>
              </Card>

              {/* Coding Practice */}
              <Card className="border-2 border-yellow-400/20 hover:border-yellow-400 transition-colors group bg-black/50 backdrop-blur">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Code className="h-8 w-8 text-black" />
                  </div>
                  <CardTitle className="text-xl text-white">Code Typing Practice</CardTitle>
                  <CardDescription className="text-gray-300">
                    Master programming syntax and concepts through hands-on typing exercises
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Cpu className="h-4 w-4 text-yellow-400" />
                      <span>Multiple programming languages</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Target className="h-4 w-4 text-yellow-400" />
                      <span>Syntax highlighting & hints</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <TrendingUp className="h-4 w-4 text-yellow-400" />
                      <span>Algorithm challenges</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500"
                  >
                    Practice Coding
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-yellow-400 to-amber-500">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-4 text-center text-black">
              <div className="space-y-2">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-black/70">Active Learners</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">50M+</div>
                <div className="text-black/70">Words Typed</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">25+</div>
                <div className="text-black/70">Languages Supported</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">95%</div>
                <div className="text-black/70">Improvement Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge className="bg-black text-yellow-400">Simple Process</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">How Fluentype Works</h2>
              <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed">
                Get started in minutes and see improvement in days
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">1</span>
                </div>
                <h3 className="text-xl font-semibold">Choose Your Path</h3>
                <p className="text-slate-600">
                  Select from typing speed, English learning, or coding practice - or combine all three for maximum
                  growth.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">2</span>
                </div>
                <h3 className="text-xl font-semibold">Practice Daily</h3>
                <p className="text-slate-600">
                  Engage with interactive lessons, real-time feedback, and personalized challenges tailored to your
                  skill level.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">3</span>
                </div>
                <h3 className="text-xl font-semibold">Track Progress</h3>
                <p className="text-slate-600">
                  Monitor your improvement with detailed analytics, achievements, and compete with learners worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Transform Your Skills?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed">
                  Join thousands of learners who are already improving their typing, English, and coding skills with
                  Fluentype.
                </p>
              </div>

              <div className="w-full max-w-md space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-white border-yellow-400 focus:border-yellow-500"
                  />
                  <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black">
                    Get Started
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  Start your free trial today. No credit card required.{" "}
                  <Link href="/terms" className="underline underline-offset-2 hover:text-slate-700">
                    Terms & Conditions
                  </Link>
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span>4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-black">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded flex items-center justify-center">
            <Keyboard className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm font-medium text-white">Fluentype</span>
        </div>
        <p className="text-xs text-gray-400 sm:ml-4">© 2024 Fluentype. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/privacy"
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-yellow-400"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-yellow-400"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-yellow-400"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
