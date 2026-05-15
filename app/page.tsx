"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMALS, AnimalType } from '@/lib/animals';
import { cn } from '@/lib/utils';
import { Sparkles, Info, RefreshCcw, ChevronRight } from 'lucide-react';

export default function AnimalAgeConverter() {
  const [animal, setAnimal] = useState<AnimalType>('dog');
  const [age, setAge] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const val = parseFloat(age);
    if (!isNaN(val)) {
      setResult(ANIMALS[animal].conversionFactor(val));
    } else {
      setResult(null);
    }
  }, [animal, age]);

  return (
    <div className="min-h-screen bg-anthracite-900 text-white selection:bg-neon-green selection:text-black font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-medium tracking-wider uppercase mb-4"
            >
              <Sparkles className="w-3 h-3 mr-2" />
              Next-Gen Age Converter
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Animal Age <span className="text-neon-green neon-text">Sync</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-md mx-auto">
              Discover how your pet's age translates to human years with high-precision mapping.
            </p>
          </div>

          {/* Main Converter Card */}
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Inputs Section */}
              <div className="space-y-8">
                <div>
                  <label className="block text-zinc-500 text-sm font-medium mb-3 ml-1">Select Companion</label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(ANIMALS).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => setAnimal(key as AnimalType)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 border",
                          animal === key 
                            ? "bg-neon-green text-black border-neon-green shadow-neon-glow scale-105" 
                            : "bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                        )}
                      >
                        <span className="text-2xl mb-1">{data.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{data.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-500 text-sm font-medium mb-3 ml-1">Animal Age (Years)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="0"
                      className="w-full bg-zinc-900/50 border border-zinc-700 rounded-2xl py-4 px-6 text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-neon-green/50 transition-all placeholder:text-zinc-700"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
                      <RefreshCcw className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="flex flex-col justify-center items-center text-center space-y-6">
                <AnimatePresence mode="wait">
                  {result !== null ? (
                    <motion.div 
                      key={`result-${animal}-${result}`}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-4 bg-neon-green/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <span className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Human Equivalent</span>
                        <div className="text-7xl md:text-8xl font-black text-white leading-none">
                          {Math.round(result)}<span className="text-neon-green text-4xl ml-2">yrs</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-zinc-600 italic text-sm"
                    >
                      Enter age to calculate...
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t border-zinc-800 w-full space-y-4"
                >
                  <div className="flex items-center justify-between text-sm px-2">
                    <span className="text-zinc-500 flex items-center">
                      <Info className="w-4 h-4 mr-2" /> Life Expectancy
                    </span>
                    <span className="text-zinc-300 font-mono">{ANIMALS[animal].lifeExpectancy}</span>
                  </div>
                  <div className="p-3 bg-zinc-800/30 rounded-xl border border-zinc-800 text-xs text-zinc-500 leading-relaxed">
                    {ANIMALS[animal].description}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <footer className="mt-12 text-center">
            <div className="flex items-center justify-center gap-6 text-zinc-600 text-xs font-medium uppercase tracking-widest">
              <span className="cursor-pointer hover:text-neon-green transition-colors">Precision Model</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full" />
              <span className="cursor-pointer hover:text-neon-green transition-colors">Comparative Biology</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full" />
              <span className="cursor-pointer hover:text-neon-green transition-colors">V1.0.0</span>
            </div>
          </footer>
        </motion.div>
      </main>
    </div>
  );
}
