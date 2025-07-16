'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Keyboard,
  ArrowRight,
  Play,
  Github,
} from "lucide-react";
import Link from "next/link";

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
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-yellow-400/10" />
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <Badge className="bg-yellow-100 text-black border border-yellow-300">
                  🚀 Master Typing & English Together
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Improve your typing skills
                  <br />
                  <span className="text-black">while learning English</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FluenType helps you enhance your typing speed and accuracy while expanding your English vocabulary, grammar, and sentence structure.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                <Link href="/levels" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-yellow-400 border border-yellow-400/20 flex items-center justify-center"
                  >
                    Start Typing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/typing?level=beginner" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black"
                  >
                    Quick Start
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center py-6 w-full shrink-0 px-4 md:px-6 border-t bg-gradient-to-r from-black to-gray-800">
        <Link
          href="https://github.com/amitmasram/Fluentype"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white mb-2"
        >
          <Github className="w-5 h-5" />
        </Link>
        <p className="text-xs text-gray-300 text-center">
          © 2025 FluenType.
        </p>
      </footer>
    </div>
  );
}
