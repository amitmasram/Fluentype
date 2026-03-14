'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function LevelsPage() {
  const sampleSentences = {
    beginner: [
      "The cat sits on the mat.",
      "I like to eat pizza.",
      "The sun is bright today.",
    ],
    intermediate: [
      "The early bird catches the worm.",
      "Knowledge is power in today's world.",
      "Success comes to those who work hard.",
    ],
    advanced: [
      "Perseverance and determination are the keys to achieving extraordinary success.",
      "The magnificent architecture of ancient civilizations continues to inspire modern builders.",
      "Scientific research has revolutionized our understanding of the universe.",
    ]
  };

  const levelInfo = {
    beginner: {
      number: "01",
      title: "Beginner",
      description: "Perfect for beginners who are just starting to learn typing. Focus on fundamental keystrokes and basic sentence structure.",
      avgWords: "3-6 words",
      count: 10
    },
    intermediate: {
      number: "02",
      title: "Intermediate",
      description: "Great for improving speed with common phrases and idioms. Enhances vocabulary and standard grammar patterns.",
      avgWords: "6-10 words",
      count: 10,
      offset: "md:mt-24" // Staggered misalignment
    },
    advanced: {
      number: "03",
      title: "Advanced",
      description: "Challenge yourself with complex sentences and vocabulary. Builds muscle memory for sophisticated phrasing.",
      avgWords: "12-20 words",
      count: 10
    }
  };

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
          <Link href="/levels" className="text-stone-900 transition-colors">Practice</Link>
          <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-stone-900 mb-6">
            Select your <br/> cadence.
          </h1>
          <p className="text-lg text-stone-500 font-light leading-relaxed max-w-lg">
            Choose a difficulty level that matches your typing skills. Each level offers unique sentences to help you improve both speed and English proficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {Object.entries(sampleSentences).map(([levelKey, sentences]) => {
            const info = levelInfo[levelKey as keyof typeof levelInfo];

            return (
              <div 
                key={levelKey}
                className={`flex flex-col group ${'offset' in info ? info.offset : ''}`}
              >
                <div className="text-xs font-mono text-yellow-500 tracking-widest uppercase flex items-center gap-2 mb-6">
                  <span className="w-4 h-[1px] bg-yellow-400 block group-hover:w-8 transition-all duration-300"></span> 
                  {info.number} / {info.title}
                </div>
                
                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl font-medium text-stone-900 tracking-tight">{info.title} mode.</h2>
                  <p className="text-stone-500 font-light leading-relaxed min-h-[5rem]">
                    {info.description}
                  </p>

                  <div className="bg-white/50 border border-stone-200 p-6 rounded-none space-y-4">
                    <p className="text-xs font-mono text-stone-400 uppercase tracking-widest">Preview</p>
                    <p className="font-mono text-stone-600 italic text-sm leading-relaxed">
                      "{sentences[0]}"
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono text-stone-400 uppercase tracking-widest pt-4 border-t border-stone-200/60">
                     <span>Avg: {info.avgWords}</span>
                     <span>{info.count} items</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href={`/typing?level=${levelKey}`}>
                    <Button 
                      className="w-full bg-stone-900 hover:bg-yellow-400 hover:text-stone-900 text-stone-50 rounded-none h-14 px-6 text-sm font-medium flex items-center justify-between transition-all"
                    >
                      <span>Start {info.title}</span>
                      <MoveRight className="ml-4 h-4 w-4 opacity-50 focus:opacity-100 transition-all" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-stone-200/60 text-stone-400">
        <span className="text-sm font-light">
          © {new Date().getFullYear()} FluenType<span className="text-yellow-500">.</span>
        </span>
      </footer>
    </div>
  );
}
