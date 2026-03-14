'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Volume2,
  CheckCircle,
  Loader2,
  RotateCcw,
  MoveRight
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
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = () => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioContextRef.current = new AudioContext();
      }
    }
  };

  const playKeystrokeSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    try {
      const t = ctx.currentTime;

      // Component 1: The "Snap" (High frequency noise burst for the switch mechanism)
      const bufferSize = ctx.sampleRate * 0.05; // 50ms of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Filter the noise to sound like plastic hitting plastic
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 1800 + Math.random() * 400; // Vary pitch slightly per keystroke
      bandpass.Q.value = 1.0;

      // Sharp percussive envelope for the click
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, t);
      noiseGain.gain.linearRampToValueAtTime(1.0, t + 0.002); // Very fast attack
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04); // Fast decay

      noiseSource.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noiseSource.start(t);

      // Component 2: The "Thud" (Low frequency resonance of the keyboard body/desk)
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();

      thud.type = 'sine';
      thud.frequency.setValueAtTime(180 + Math.random() * 20, t);
      thud.frequency.exponentialRampToValueAtTime(40, t + 0.06);

      // Thicker envelope for the thud
      thudGain.gain.setValueAtTime(0, t);
      thudGain.gain.linearRampToValueAtTime(1.5, t + 0.005); 
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      thud.connect(thudGain);
      thudGain.connect(ctx.destination);

      thud.start(t);
      thud.stop(t + 0.1);

    } catch (e) {
      console.error("Audio playback failed", e);
    }
  }, []);

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
    initAudioContext();
    const value = e.target.value;

    if (value.length !== userInput.length) {
      playKeystrokeSound();
    }

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
      return userInput[index] === currentSentence[index] ? 'text-stone-900 border-b-2 border-yellow-400 opacity-100' : 'text-red-600 bg-red-100/50 opacity-100 border-b-2 border-red-500';
    }
    return index === userInput.length ? 'text-stone-900 bg-stone-200' : 'text-stone-400 opacity-50';
  };

  const renderSentence = () => {
    return currentSentence.split('').map((char, index) => (
      <span key={index} className={`${getCharacterClass(index)} transition-all duration-75`}>
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
      "The cat sits on the mat.": { meaning: "A simple sentence describing where the cat is positioned.", grammar: "Present Simple tense, with preposition 'on' showing location.", hindi: "बिल्ली चटाई पर बैठी है।" },
      "I like to eat pizza.": { meaning: "Expresses personal preference for eating pizza.", grammar: "Present Simple tense with verb 'like' followed by an infinitive.", hindi: "मुझे पिज्जा खाना पसंद है।" },
      "The sun is bright today.": { meaning: "It is a sunny or bright day today.", grammar: "Present Simple tense with 'is' as a linking verb.", hindi: "आज सूरज तेज चमक रहा है।" },
      "She reads a good book.": { meaning: "She is reading a book that is enjoyable or of good quality.", grammar: "Present Simple tense, third-person singular subject.", hindi: "वह एक अच्छी किताब पढ़ती है।" },
      "We play in the park.": { meaning: "Describes an activity of playing that takes place in the park.", grammar: "Present Simple tense with plural subject 'we'.", hindi: "हम पार्क में खेलते हैं।" },
      "He drinks a glass of milk.": { meaning: "Describes a daily habit of drinking milk.", grammar: "Present Simple tense, third-person singular.", hindi: "वह एक गिलास दूध पीता है।" },
      "They walk to school every day.": { meaning: "Describes a routine activity.", grammar: "Present Simple tense with time expression.", hindi: "वे हर दिन स्कूल पैदल जाते हैं।" },
      "Birds sing in the morning.": { meaning: "Tells when birds make sounds.", grammar: "Present Simple tense with time phrase.", hindi: "पक्षी सुबह गाते हैं।" },
      "My dog loves to run.": { meaning: "Expresses what the dog enjoys doing.", grammar: "Present Simple tense, singular subject.", hindi: "मेरा कुत्ता दौड़ना पसंद करता है।" },
      "She has a red balloon.": { meaning: "States what she owns.", grammar: "Present Simple with verb 'has'.", hindi: "उसके पास एक लाल गुब्बारा है।" },
  
      // Intermediate
      "The early bird catches the worm.": { meaning: "People who act quickly or early get better results or opportunities.", grammar: "Present Simple tense; an idiom.", hindi: "जो जल्दी उठता है, वही लाभ उठाता है।" },
      "Knowledge is power in today's world.": { meaning: "Having knowledge gives a strong advantage.", grammar: "Present Simple tense with abstract noun 'knowledge' as subject.", hindi: "आज की दुनिया में ज्ञान ही शक्ति है।" },
      "Success comes to those who work hard.": { meaning: "People who put in effort achieve success.", grammar: "Present Simple tense with relative clause.", hindi: "सफलता उन्हें मिलती है जो मेहनत करते हैं।" },
      "Time heals all wounds eventually.": { meaning: "Emotional pain fades with time.", grammar: "Present Simple tense with adverb 'eventually'.", hindi: "समय सभी घावों को अंततः भर देता है।" },
      "Practice makes perfect in everything.": { meaning: "Repeating an activity improves skill.", grammar: "Present Simple tense; proverb structure.", hindi: "अभ्यास से हर चीज़ में परिपूर्णता आती है।" },
      "Every cloud has a silver lining.": { meaning: "There is hope even in difficult times.", grammar: "Idiom using Present Simple tense.", hindi: "हर बुरे समय में भी कुछ अच्छा होता है।" },
      "Hard work beats talent when talent doesn't work hard.": { meaning: "Effort matters more than ability alone.", grammar: "Complex sentence with Present Simple.", hindi: "कड़ी मेहनत प्रतिभा से बेहतर होती है जब प्रतिभा मेहनत नहीं करती।" },
      "A journey of a thousand miles begins with a single step.": { meaning: "Big goals start with small actions.", grammar: "Proverb structure, Present Simple tense.", hindi: "हजार मील की यात्रा एक कदम से शुरू होती है।" },
      "Don't count your chickens before they hatch.": { meaning: "Don't assume success too early.", grammar: "Negative imperative with idiom.", hindi: "अंडे से पहले मुर्गियां मत गिनो।" },
      "Actions speak louder than words.": { meaning: "What you do matters more than what you say.", grammar: "Present Simple tense with comparison.", hindi: "काम शब्दों से ज्यादा प्रभावी होते हैं।" },
  
      // Advanced
      "Perseverance and determination are the keys to achieving extraordinary success.": { meaning: "Consistency and strong will are essential for big success.", grammar: "Plural compound subject with Present Simple tense.", hindi: "दृढ़ता और संकल्प असाधारण सफलता की कुंजी हैं।" },
      "The magnificent architecture of ancient civilizations continues to inspire modern builders.": { meaning: "Old buildings still influence today's architects.", grammar: "Present Simple tense with 'continues to' for ongoing effect.", hindi: "प्राचीन सभ्यताओं की भव्य वास्तुकला आज भी आधुनिक निर्माताओं को प्रेरित करती है।" },
      "Scientific research has revolutionized our understanding of the universe.": { meaning: "Science has changed how we understand the universe.", grammar: "Present Perfect tense to show recent, ongoing impact.", hindi: "वैज्ञानिक अनुसंधान ने हमारे ब्रह्मांड की समझ में क्रांति ला दी है।" },
      "Environmental conservation requires collective effort from all nations.": { meaning: "Protecting the environment needs everyone's help.", grammar: "Present Simple tense with abstract noun 'conservation' as subject.", hindi: "पर्यावरण संरक्षण के लिए सभी देशों का सामूहिक प्रयास आवश्यक है।" },
      "Technology has transformed the way we communicate and interact.": { meaning: "Modern technology changed how we talk and connect.", grammar: "Present Perfect tense showing past action with ongoing result.", hindi: "तकनीक ने हमारे संवाद और मेल-जोल के तरीके को बदल दिया है।" },
      "Globalization has created unprecedented opportunities and challenges across borders.": { meaning: "Globalization brings both good and bad changes internationally.", grammar: "Present Perfect tense.", hindi: "वैश्वीकरण ने सीमाओं के पार अभूतपूर्व अवसर और चुनौतियाँ पैदा की हैं।" },
      "Innovation thrives in environments that encourage curiosity and experimentation.": { meaning: "New ideas grow where curiosity is welcome.", grammar: "Present Simple with relative clause.", hindi: "नवाचार उन स्थानों पर फलता-फूलता है जहाँ जिज्ञासा और प्रयोग को बढ़ावा मिलता है।" },
      "Artificial intelligence is reshaping industries and redefining human potential.": { meaning: "AI is changing how we work and think.", grammar: "Present Continuous implication using Present Simple tense.", hindi: "कृत्रिम बुद्धिमत्ता उद्योगों को बदल रही है और मानव क्षमता को पुनर्परिभाषित कर रही है।" },
      "Effective leadership demands empathy, vision, and decision-making.": { meaning: "Good leaders need emotional understanding and clarity.", grammar: "Present Simple with abstract nouns.", hindi: "प्रभावी नेतृत्व में सहानुभूति, दृष्टिकोण और निर्णय लेने की आवश्यकता होती है।" },
      "Economic disparity remains a major obstacle to inclusive development.": { meaning: "Inequality blocks equal progress for everyone.", grammar: "Present Simple with 'remains' as linking verb.", hindi: "आर्थिक असमानता समावेशी विकास में एक बड़ी बाधा है।" }
    };
  
    return explanations[currentSentence] || {
      meaning: "This sentence helps improve your typing skills and English proficiency.",
      grammar: "Focus on typing accuracy and speed.",
      hindi: "यह वाक्य आपकी टाइपिंग और अंग्रेजी सुधारने में मदद करता है।"
    };
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
          <Link href="/levels" className="hover:text-stone-900 transition-colors">Change Level</Link>
          <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-24">
        
        {/* Top Stats */}
        <div className="flex items-center justify-between text-xs font-mono text-stone-400 uppercase tracking-widest mb-12 border-b border-stone-200 pb-8">
          <div className="flex gap-8 lg:gap-16">
            <div>
              <span className="block mb-2 text-stone-400">WPM</span>
              <span className="text-2xl text-stone-900">{wpm}</span>
            </div>
            <div>
              <span className="block mb-2 text-stone-400">Accuracy</span>
              <span className="text-2xl text-stone-900">{accuracy}%</span>
            </div>
          </div>
          <div className="flex gap-8 lg:gap-16 text-right">
             <div className="hidden sm:block">
              <span className="block mb-2 text-stone-400">Errors</span>
              <span className="text-2xl text-stone-900">{errors}</span>
            </div>
            <div>
              <span className="block mb-2 text-stone-400">Time</span>
              <span className="text-2xl text-stone-900">{Math.round(timeElapsed)}s</span>
            </div>
          </div>
        </div>

        {/* Typing Interface */}
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-yellow-500 tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-[1px] bg-yellow-400 block"></span> {level} Mode
            </div>
            <button onClick={speakSentence} className="text-stone-400 hover:text-yellow-500 transition-colors" title="Listen to sentence">
              <Volume2 className="h-5 w-5" />
            </button>
          </div>

          <div className="relative group">
             <div className="text-3xl md:text-4xl font-light leading-relaxed text-stone-300 font-sans tracking-tight absolute inset-0 pointer-events-none select-none">
                {currentSentence}
             </div>
             
             <div className="text-3xl md:text-4xl font-light leading-relaxed font-sans tracking-tight z-10 relative break-all pointer-events-none mb-12">
                {renderSentence()}
             </div>

             <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder={isTyping ? '' : "Start typing to begin..."}
                  disabled={isCompleted}
                  className="w-full bg-transparent border-b-2 border-stone-200 focus:border-yellow-400 pb-4 text-xl md:text-2xl text-stone-900 focus:outline-none transition-colors"
                  autoFocus
                />
                
                {isCompleted && (
                  <CheckCircle className="absolute right-0 top-0 h-6 w-6 text-yellow-500" />
                )}
             </div>
          </div>

          <div className="flex gap-4 pt-8">
            <Button onClick={resetTypingTest} variant="ghost" className="text-stone-500 hover:text-stone-900 rounded-none h-12 px-6">
              <RotateCcw className="h-4 w-4 mr-2" /> Restart
            </Button>
            {isCompleted && (
               <Button onClick={() => { resetTypingTest(); inputRef.current?.focus(); }} className="bg-yellow-400 hover:bg-yellow-500 text-stone-900 rounded-none h-12 px-8 flex items-center group transition-all">
                Continue <MoveRight className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            )}
          </div>
        </div>

        {/* Results Analysis */}
        {showResults && (
           <div className="mt-24 pt-12 border-t border-stone-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-6">Analysis</div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h3 className="text-xl font-medium text-stone-900 mb-2">Meaning.</h3>
                  <p className="text-stone-500 font-light leading-relaxed">{getSentenceExplanation().meaning}</p>
               </div>
               
               <div className="space-y-6">
                 <div>
                    <h3 className="text-xl font-medium text-stone-900 mb-2">Syntax.</h3>
                    <p className="text-stone-500 font-light leading-relaxed">{getSentenceExplanation().grammar}</p>
                 </div>
                 <div>
                    <h3 className="text-xl font-medium text-stone-900 mb-2">Translation.</h3>
                    <p className="text-stone-500 font-light leading-relaxed font-sans">{getSentenceExplanation().hindi}</p>
                 </div>
               </div>
             </div>
           </div>
        )}
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-50">
      <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
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