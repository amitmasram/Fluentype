'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Keyboard,
  Target,
  Zap,
  Trophy,
  Play,
  Home
} from "lucide-react";

export default function LevelsPage() {
  const sampleSentences = {
    beginner: [
      "The cat sits on the mat.",
      "I like to eat pizza.",
      "The sun is bright today.",
      "She reads a good book.",
      "We play in the park.",
      "He drinks a glass of milk.",
      "They walk to school every day.",
      "Birds sing in the morning.",
      "My dog loves to run.",
      "She has a red balloon."
    ],
    intermediate: [
      "The early bird catches the worm.",
      "Knowledge is power in today's world.",
      "Success comes to those who work hard.",
      "Time heals all wounds eventually.",
      "Practice makes perfect in everything.",
      "Every cloud has a silver lining.",
      "Hard work beats talent when talent doesn't work hard.",
      "A journey of a thousand miles begins with a single step.",
      "Don't count your chickens before they hatch.",
      "Actions speak louder than words."
    ],
    advanced: [
      "Perseverance and determination are the keys to achieving extraordinary success.",
      "The magnificent architecture of ancient civilizations continues to inspire modern builders.",
      "Scientific research has revolutionized our understanding of the universe.",
      "Environmental conservation requires collective effort from all nations.",
      "Technology has transformed the way we communicate and interact.",
      "Globalization has created unprecedented opportunities and challenges across borders.",
      "Innovation thrives in environments that encourage curiosity and experimentation.",
      "Artificial intelligence is reshaping industries and redefining human potential.",
      "Effective leadership demands empathy, vision, and decision-making.",
      "Economic disparity remains a major obstacle to inclusive development."
    ]
  };

  const levelInfo = {
    beginner: {
      icon: Target,
      color: "text-green-500",
      description: "Perfect for beginners who are just starting to learn typing",
      avgWords: "3-6 words per sentence",
      difficulty: "Easy"
    },
    intermediate: {
      icon: Zap,
      color: "text-yellow-500",
      description: "Great for improving speed with common phrases and idioms",
      avgWords: "6-10 words per sentence",
      difficulty: "Medium"
    },
    advanced: {
      icon: Trophy,
      color: "text-red-500",
      description: "Challenge yourself with complex sentences and vocabulary",
      avgWords: "12-20 words per sentence",
      difficulty: "Hard"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
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
        <div className="ml-auto flex gap-2">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">Choose Your Level</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select a difficulty level that matches your typing skills. Each level offers unique 
              sentences to help you improve both typing speed and English proficiency.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-3xl mx-auto">
            {Object.entries(sampleSentences).map(([levelKey, sentences]) => {
              const info = levelInfo[levelKey as keyof typeof levelInfo];
              const IconComponent = info.icon;

              return (
                <Card 
                  key={levelKey}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 group border-2 hover:border-yellow-400/50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-8 w-8 ${info.color}`} />
                        <div>
                          <CardTitle className="capitalize text-2xl">{levelKey}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">{info.difficulty}</Badge>
                        <div className="text-xs text-gray-500">
                          {sentences.length} sentences
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <p className="text-sm text-gray-600 mb-2">Sample sentence:</p>
                      <p className="font-mono text-gray-800 italic">
                        &quot;{sentences[0]}&quot;
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Average: {info.avgWords}</span>
                      <span>Total sentences: {sentences.length}</span>
                    </div>

                    <Link href={`/typing?level=${levelKey}`}>
                      <Button 
                        className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-yellow-400 border border-yellow-400/20 group-hover:border-yellow-400 transition-all"
                        size="lg"
                      >
                        Start {levelKey.charAt(0).toUpperCase() + levelKey.slice(1)} Practice
                        <Play className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">What You&apos;ll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">Typing Speed</div>
                <p className="text-sm text-gray-600">Improve your WPM with real-time feedback</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">English Skills</div>
                <p className="text-sm text-gray-600">Learn grammar, vocabulary, and idioms</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">Accuracy</div>
                <p className="text-sm text-gray-600">Develop muscle memory and reduce errors</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
