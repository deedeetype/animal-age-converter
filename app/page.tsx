"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANIMALS = [
  { name: 'Dog', emoji: '🐶', ratio: 7, lifeExpectancy: 12 },
  { name: 'Cat', emoji: '🐱', ratio: 7, lifeExpectancy: 15 },
  { name: 'Rabbit', emoji: '🐰', ratio: 8, lifeExpectancy: 10 },
  { name: 'Hamster', emoji: '🐹', ratio: 30, lifeExpectancy: 3 },
  { name: 'Bird', emoji: '🐦', ratio: 5, lifeExpectancy: 15 },
  { name: 'Turtle', emoji: '🐢', ratio: 1, lifeExpectancy: 100 },
  { name: 'Mouse', emoji: '🐭', ratio: 25, lifeExpectancy: 2 },
  { name: 'Elephant', emoji: '🐘', ratio: 3, lifeExpectancy: 60 },
];

export default function AnimalAgeConverter() {
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [ageInput, setAgeInput] = useState('');
  const [humanAge, setHumanAge] = useState<number | null>(null);

  useEffect(() => {
    if (selectedAnimal && ageInput && !isNaN(Number(ageInput))) {
      setHumanAge(Math.round(Number(ageInput) * selectedAnimal.ratio));
    } else {
      setHumanAge(null);
    }
  }, [selectedAnimal, ageInput]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#39FF14] selection:text-black p-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black tracking-tighter mb-4 italic"
          >
            ANIMAL<span className="text-[#39FF14]">AGE</span>
          </motion.h1>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">
            Precision biological conversion
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent opacity-50" />
          
          <div className="space-y-8">
            {/* Animal Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-wider ml-1">
                Select Creature
              </label>
              <div className="grid grid-cols-4 gap-3">
                {ANIMALS.map((animal, index) => (
                  <motion.button
                    key={animal.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: '#39FF14' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAnimal(animal)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedAnimal?.name === animal.name 
                        ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]' 
                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    <span className="text-2xl mb-1">{animal.emoji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{animal.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-400 uppercase tracking-wider ml-1">
                Biological Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={ageInput}
                  onChange={(e) => setAgeInput(e.target.value)}
                  placeholder="0"
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-2xl font-bold focus:outline-none focus:border-[#39FF14] transition-colors text-center placeholder:text-zinc-700"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-sm uppercase">
                  Years
                </span>
              </div>
            </div>

            {/* Result Section */}
            <AnimatePresence mode="wait">
              {humanAge !== null && selectedAnimal ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="mt-10 p-6 rounded-3xl bg-gradient-to-br from-[#39FF14] to-[#2ecc71] text-black text-center relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">
                      Human Equivalent
                    </p>
                    <h2 className="text-6xl font-black tracking-tighter mb-2">
                      {humanAge}
                    </h2>
                    <p className="text-sm font-bold opacity-90 italic">
                      Life expectancy for {selectedAnimal.name}s: {selectedAnimal.lifeExpectancy} yrs
                    </p>
                  </div>
                  {/* Decorative background circle */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={false}
                  animate={{ opacity: 1 }}
                  className="mt-10 p-6 rounded-3xl border-2 border-dashed border-zinc-800 text-zinc-600 text-center"
                >
                  <p className="text-sm font-medium italic">
                    Select an animal and enter age to calculate...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Credits */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-zinc-700 text-[10px] uppercase tracking-[0.2em] font-bold">
            © 2026 BioMetric Intelligence System
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
