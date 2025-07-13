'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Keyboard,
  ArrowLeft,
  RotateCcw,
  Volume2,
  BookOpen,
  Trophy,
  Play,
  CheckCircle,
  Home,
  Loader2
} from 'lucide-react';

function TypingPracticeContent() {
  const searchParams = useSearchParams();
  const queryLevel = searchParams.get('level');

  const sampleSentences = useMemo(() => ({
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
  }), []);

  const [level, setLevel] = useState('beginner');
  const [currentSentence, setCurrentSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTypingTest = useCallback(() => {
    const sentences = sampleSentences[level as keyof typeof sampleSentences];
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(randomSentence);
    setUserInput('');
    setIsTyping(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setIsCompleted(false);
    setShowResults(false);
    setTimeElapsed(0);
  }, [level, sampleSentences]);

  useEffect(() => {
    if (
      queryLevel &&
      (queryLevel === 'beginner' ||
        queryLevel === 'intermediate' ||
        queryLevel === 'advanced')
    ) {
      setLevel(queryLevel);
    }
  }, [queryLevel]);

  useEffect(() => {
    resetTypingTest();
  }, [resetTypingTest]);

  useEffect(() => {
    if (isTyping && startTime) {
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setTimeElapsed(elapsed);

        if (userInput.length > 0) {
          const wordsTyped = userInput.trim().split(' ').length;
          const minutes = elapsed / 60;
          const currentWpm = Math.round(wordsTyped / minutes) || 0;
          setWpm(currentWpm);
        }
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTyping, startTime, userInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      setStartTime(Date.now());
    }

    setUserInput(value);

    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentSentence[i]) {
        errorCount++;
      }
    }

    setErrors(errorCount);
    const currentAccuracy = value.length > 0 ? Math.round(((value.length - errorCount) / value.length) * 100) : 100;
    setAccuracy(currentAccuracy);

    if (value === currentSentence) {
      setIsCompleted(true);
      setIsTyping(false);
      setShowResults(true);
    }
  };

  const getCharacterClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === currentSentence[index] ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
    }
    return index === userInput.length ? 'bg-blue-200' : 'text-gray-400';
  };

  const renderSentence = () => {
    return currentSentence.split('').map((char, index) => (
      <span key={index} className={`${getCharacterClass(index)} px-0.5 py-1 rounded text-lg`}>
        {char}
      </span>
    ));
  };

  const speakSentence = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentSentence);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getSentenceExplanation = () => {
    const explanations: Record<string, { meaning: string; grammar: string; hindi: string }> = {
      // Beginner
      "The cat sits on the mat.": {
        meaning: "A simple sentence describing where the cat is positioned.",
        grammar: "Present Simple tense, with preposition 'on' showing location.",
        hindi: "बिल्ली चटाई पर बैठी है।"
      },
      "I like to eat pizza.": {
        meaning: "Expresses personal preference for eating pizza.",
        grammar: "Present Simple tense with verb 'like' followed by an infinitive.",
        hindi: "मुझे पिज्जा खाना पसंद है।"
      },
      "The sun is bright today.": {
        meaning: "It is a sunny or bright day today.",
        grammar: "Present Simple tense with 'is' as a linking verb.",
        hindi: "आज सूरज तेज चमक रहा है।"
      },
      "She reads a good book.": {
        meaning: "She is reading a book that is enjoyable or of good quality.",
        grammar: "Present Simple tense, third-person singular subject.",
        hindi: "वह एक अच्छी किताब पढ़ती है।"
      },
      "We play in the park.": {
        meaning: "Describes an activity of playing that takes place in the park.",
        grammar: "Present Simple tense with plural subject 'we'.",
        hindi: "हम पार्क में खेलते हैं।"
      },
      "He drinks a glass of milk.": {
        meaning: "Describes a daily habit of drinking milk.",
        grammar: "Present Simple tense, third-person singular.",
        hindi: "वह एक गिलास दूध पीता है।"
      },
      "They walk to school every day.": {
        meaning: "Describes a routine activity.",
        grammar: "Present Simple tense with time expression.",
        hindi: "वे हर दिन स्कूल पैदल जाते हैं।"
      },
      "Birds sing in the morning.": {
        meaning: "Tells when birds make sounds.",
        grammar: "Present Simple tense with time phrase.",
        hindi: "पक्षी सुबह गाते हैं।"
      },
      "My dog loves to run.": {
        meaning: "Expresses what the dog enjoys doing.",
        grammar: "Present Simple tense, singular subject.",
        hindi: "मेरा कुत्ता दौड़ना पसंद करता है।"
      },
      "She has a red balloon.": {
        meaning: "States what she owns.",
        grammar: "Present Simple with verb 'has'.",
        hindi: "उसके पास एक लाल गुब्बारा है।"
      },
  
      // Intermediate
      "The early bird catches the worm.": {
        meaning: "People who act quickly or early get better results or opportunities.",
        grammar: "Present Simple tense; an idiom.",
        hindi: "जो जल्दी उठता है, वही लाभ उठाता है।"
      },
      "Knowledge is power in today's world.": {
        meaning: "Having knowledge gives a strong advantage.",
        grammar: "Present Simple tense with abstract noun 'knowledge' as subject.",
        hindi: "आज की दुनिया में ज्ञान ही शक्ति है।"
      },
      "Success comes to those who work hard.": {
        meaning: "People who put in effort achieve success.",
        grammar: "Present Simple tense with relative clause.",
        hindi: "सफलता उन्हें मिलती है जो मेहनत करते हैं।"
      },
      "Time heals all wounds eventually.": {
        meaning: "Emotional pain fades with time.",
        grammar: "Present Simple tense with adverb 'eventually'.",
        hindi: "समय सभी घावों को अंततः भर देता है।"
      },
      "Practice makes perfect in everything.": {
        meaning: "Repeating an activity improves skill.",
        grammar: "Present Simple tense; proverb structure.",
        hindi: "अभ्यास से हर चीज़ में परिपूर्णता आती है।"
      },
      "Every cloud has a silver lining.": {
        meaning: "There is hope even in difficult times.",
        grammar: "Idiom using Present Simple tense.",
        hindi: "हर बुरे समय में भी कुछ अच्छा होता है।"
      },
      "Hard work beats talent when talent doesn't work hard.": {
        meaning: "Effort matters more than ability alone.",
        grammar: "Complex sentence with Present Simple.",
        hindi: "कड़ी मेहनत प्रतिभा से बेहतर होती है जब प्रतिभा मेहनत नहीं करती।"
      },
      "A journey of a thousand miles begins with a single step.": {
        meaning: "Big goals start with small actions.",
        grammar: "Proverb structure, Present Simple tense.",
        hindi: "हजार मील की यात्रा एक कदम से शुरू होती है।"
      },
      "Don't count your chickens before they hatch.": {
        meaning: "Don't assume success too early.",
        grammar: "Negative imperative with idiom.",
        hindi: "अंडे से पहले मुर्गियां मत गिनो।"
      },
      "Actions speak louder than words.": {
        meaning: "What you do matters more than what you say.",
        grammar: "Present Simple tense with comparison.",
        hindi: "काम शब्दों से ज्यादा प्रभावी होते हैं।"
      },
  
      // Advanced
      "Perseverance and determination are the keys to achieving extraordinary success.": {
        meaning: "Consistency and strong will are essential for big success.",
        grammar: "Plural compound subject with Present Simple tense.",
        hindi: "दृढ़ता और संकल्प असाधारण सफलता की कुंजी हैं।"
      },
      "The magnificent architecture of ancient civilizations continues to inspire modern builders.": {
        meaning: "Old buildings still influence today's architects.",
        grammar: "Present Simple tense with 'continues to' for ongoing effect.",
        hindi: "प्राचीन सभ्यताओं की भव्य वास्तुकला आज भी आधुनिक निर्माताओं को प्रेरित करती है।"
      },
      "Scientific research has revolutionized our understanding of the universe.": {
        meaning: "Science has changed how we understand the universe.",
        grammar: "Present Perfect tense to show recent, ongoing impact.",
        hindi: "वैज्ञानिक अनुसंधान ने हमारे ब्रह्मांड की समझ में क्रांति ला दी है।"
      },
      "Environmental conservation requires collective effort from all nations.": {
        meaning: "Protecting the environment needs everyone's help.",
        grammar: "Present Simple tense with abstract noun 'conservation' as subject.",
        hindi: "पर्यावरण संरक्षण के लिए सभी देशों का सामूहिक प्रयास आवश्यक है।"
      },
      "Technology has transformed the way we communicate and interact.": {
        meaning: "Modern technology changed how we talk and connect.",
        grammar: "Present Perfect tense showing past action with ongoing result.",
        hindi: "तकनीक ने हमारे संवाद और मेल-जोल के तरीके को बदल दिया है।"
      },
      "Globalization has created unprecedented opportunities and challenges across borders.": {
        meaning: "Globalization brings both good and bad changes internationally.",
        grammar: "Present Perfect tense.",
        hindi: "वैश्वीकरण ने सीमाओं के पार अभूतपूर्व अवसर और चुनौतियाँ पैदा की हैं।"
      },
      "Innovation thrives in environments that encourage curiosity and experimentation.": {
        meaning: "New ideas grow where curiosity is welcome.",
        grammar: "Present Simple with relative clause.",
        hindi: "नवाचार उन स्थानों पर फलता-फूलता है जहाँ जिज्ञासा और प्रयोग को बढ़ावा मिलता है।"
      },
      "Artificial intelligence is reshaping industries and redefining human potential.": {
        meaning: "AI is changing how we work and think.",
        grammar: "Present Continuous implication using Present Simple tense.",
        hindi: "कृत्रिम बुद्धिमत्ता उद्योगों को बदल रही है और मानव क्षमता को पुनर्परिभाषित कर रही है।"
      },
      "Effective leadership demands empathy, vision, and decision-making.": {
        meaning: "Good leaders need emotional understanding and clarity.",
        grammar: "Present Simple with abstract nouns.",
        hindi: "प्रभावी नेतृत्व में सहानुभूति, दृष्टिकोण और निर्णय लेने की आवश्यकता होती है।"
      },
      "Economic disparity remains a major obstacle to inclusive development.": {
        meaning: "Inequality blocks equal progress for everyone.",
        grammar: "Present Simple with 'remains' as linking verb.",
        hindi: "आर्थिक असमानता समावेशी विकास में एक बड़ी बाधा है।"
      }
    };
  
    return explanations[currentSentence] || {
      meaning: "This sentence helps improve your typing skills and English proficiency.",
      grammar: "Focus on typing accuracy and speed.",
      hindi: "यह वाक्य आपकी टाइपिंग और अंग्रेजी सुधारने में मदद करता है।"
    };
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
          <Link href="/levels">
            <Button variant="outline" size="sm" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Change Level
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">{wpm}</div><div className="text-sm text-gray-600">WPM</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{accuracy}%</div><div className="text-sm text-gray-600">Accuracy</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-red-600">{errors}</div><div className="text-sm text-gray-600">Errors</div></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-purple-600">{Math.round(timeElapsed)}s</div><div className="text-sm text-gray-600">Time</div></CardContent></Card>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-sm">Level: {level.charAt(0).toUpperCase() + level.slice(1)}</Badge>
            <Button variant="outline" size="sm" onClick={speakSentence} className="flex items-center gap-2"><Volume2 className="h-4 w-4" />Listen</Button>
          </div>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Type the sentence below</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-lg font-mono leading-relaxed">{renderSentence()}</div>
              </div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Start typing here..."
                  disabled={isCompleted}
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none font-mono"
                  autoFocus
                />
                {isCompleted && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-green-500" />
                )}
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={resetTypingTest} variant="outline" className="flex items-center gap-2"><RotateCcw className="h-4 w-4" />Reset</Button>
                <Button onClick={() => { resetTypingTest(); inputRef.current?.focus(); }} className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2"><Play className="h-4 w-4" />New Sentence</Button>
              </div>
            </CardContent>
          </Card>

          {showResults && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader><CardTitle className="flex items-center gap-2 text-green-700"><Trophy className="h-5 w-5" />Great Job! Sentence Completed</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center"><div className="text-xl font-bold text-blue-600">{wpm}</div><div className="text-sm text-gray-600">Words per minute</div></div>
                  <div className="text-center"><div className="text-xl font-bold text-green-600">{accuracy}%</div><div className="text-sm text-gray-600">Accuracy</div></div>
                  <div className="text-center"><div className="text-xl font-bold text-red-600">{errors}</div><div className="text-sm text-gray-600">Total errors</div></div>
                  <div className="text-center"><div className="text-xl font-bold text-purple-600">{Math.round(timeElapsed)}s</div><div className="text-sm text-gray-600">Time taken</div></div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><BookOpen className="h-4 w-4" />Learn About This Sentence</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">Meaning:</span> {getSentenceExplanation().meaning}</div>
                    <div><span className="font-medium">Grammar:</span> {getSentenceExplanation().grammar}</div>
                    <div><span className="font-medium">Hindi Translation:</span> {getSentenceExplanation().hindi}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
        <span className="text-lg text-gray-600">Loading typing practice...</span>
      </div>
    </div>
  );
}

export default function TypingPracticePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TypingPracticeContent />
    </Suspense>
  );
}