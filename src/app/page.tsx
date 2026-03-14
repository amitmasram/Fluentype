'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";

export default function FluentypeLanding() {
      return (
            <div className="flex flex-col min-h-screen bg-stone-50 font-sans selection:bg-yellow-200">
                  {/* Header */}
                  <header className="px-6 lg:px-12 h-20 flex items-center justify-between sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md">
                        <Link href="/" className="flex items-center">
                              <span className="text-lg font-medium text-stone-900 tracking-tight">
                                    FluenType<span className="text-yellow-500">.</span>
                              </span>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-8 text-sm text-stone-600">
                              <Link href="/levels" className="hover:text-stone-900 transition-colors">Practice</Link>
                              <Link href="#" className="hover:text-stone-900 transition-colors">Manifesto</Link>
                              <a
                                    href="https://github.com/amitmasram/Fluentype"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-stone-900 transition-colors"
                              >
                                    Source
                              </a>
                        </nav>
                  </header>

                  <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12">
                        {/* Hero Section */}
                        <section className="pt-32 pb-24 md:pt-48 md:pb-32">
                              <div className="flex flex-col md:flex-row gap-12 sm:gap-24 relative">

                                    {/* Title Block - Anchored Left */}
                                    <div className="flex-1">
                                          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tighter text-stone-900 leading-[1.1]">
                                                Type <br />
                                                fluent. <br />
                                                Think <br />
                                                clear.
                                          </h1>
                                    </div>

                                    {/* Content Block - Purposefully Misaligned down and pushed right on large screens */}
                                    <div className="flex-1 flex flex-col justify-end md:pb-8 lg:pl-16 xl:pl-32 mt-12 md:mt-0 xl:mt-48 relative z-10">
                                          <p className="text-lg sm:text-xl text-stone-500 font-light leading-relaxed max-w-md mb-10">
                                                A minimalistic environment designed to sharpen your keystrokes while instinctively expanding your English vocabulary and sentence structures. No distractions, just rhythm.
                                          </p>

                                          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-sm">
                                                <Link href="/levels" className="w-full sm:w-auto">
                                                      <Button
                                                            size="lg"
                                                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-stone-900 rounded-none h-14 px-8 text-base font-medium flex items-center justify-between group transition-all"
                                                      >
                                                            <span>Begin Session</span>
                                                            <MoveRight className="ml-4 h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                      </Button>
                                                </Link>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        {/* Detail/Feature Section */}
                        <section className="py-24 border-t border-stone-200/60">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">

                                    {/* Feature 1 */}
                                    <div className="space-y-6">
                                          <div className="text-xs font-mono text-yellow-500 tracking-widest uppercase flex items-center gap-2">
                                                <span className="w-4 h-[1px] bg-yellow-400 block"></span> 01 / Focus
                                          </div>
                                          <h2 className="text-2xl font-medium text-stone-900 tracking-tight">Absolute clarity.</h2>
                                          <p className="text-stone-500 font-light leading-relaxed">
                                                The interface strips away gamification and clutter. A sterile calm that lets you hyper-focus on the cadence of your typing and the quality of the prose.
                                          </p>
                                    </div>

                                    {/* Feature 2 - Purposeful vertical misalignment */}
                                    <div className="space-y-6 md:mt-32">
                                          <div className="text-xs font-mono text-yellow-500 tracking-widest uppercase flex items-center gap-2">
                                                <span className="w-4 h-[1px] bg-yellow-400 block"></span> 02 / Synthesis
                                          </div>
                                          <h2 className="text-2xl font-medium text-stone-900 tracking-tight">Subconscious learning.</h2>
                                          <p className="text-stone-500 font-light leading-relaxed">
                                                By repeatedly typing well-structured English sentences, you internalize grammar patterns and vocabulary without traditional rote memorization.
                                          </p>
                                    </div>

                              </div>
                        </section>
                  </main>

                  {/* Footer */}
                  <footer className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-stone-200/60 text-stone-400">
                        <span className="text-sm font-light">
                              © {new Date().getFullYear()} FluenType<span className="text-yellow-500">.</span>
                        </span>
                        <div className="mt-4 md:mt-0 flex gap-6 text-sm font-light">
                              <Link href="/typing?level=beginner" className="hover:text-stone-900 transition-colors">Quick Start</Link>
                              <a href="https://github.com/amitmasram/Fluentype" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors">GitHub</a>
                        </div>
                  </footer>
            </div>
      );
}
