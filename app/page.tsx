"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMAL_CATEGORIES, FLAT_ANIMALS } from './animals';

const QUICK_PICK = FLAT_ANIMALS.slice(0, 8);

export default function AnimalAgeConverter() {
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [ageInput, setAgeInput] = useState('');
  const [humanAge, setHumanAge] = useState<number | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (selectedAnimal && ageInput && !isNaN(Number(ageInput))) {
      setHumanAge(Math.round(Number(ageInput) * selectedAnimal.ratio));
    } else {
      setHumanAge(null);
    }
  }, [selectedAnimal, ageInput]);

  const filteredAnimals = FLAT_ANIMALS.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
      Object.entries(ANIMAL_CATEGORIES).some(([cat, animals]) => 
        cat === activeCategory && animals.some(a => a.name === animal.name)
      );
    return matchesSearch && matchesCategory;
  });

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
                {QUICK_PICK.map((animal, index) => (
                  <motion.button
                    key={animal.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: '#39FF14' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAnimal(animal)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${\n                      selectedAnimal?.name === animal.name \n                        ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]' \n                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800'\n                    }`}
                  >
                    <span className="text-2xl mb-1">{animal.emoji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{animal.name}</span>
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLibraryOpen(true)}
                className="w-full py-3 rounded-xl border-2 border-dashed border-zinc-700 text-zinc-500 text-xs font-bold uppercase tracking-widest hover:border-[#39FF14] hover:text-[#39FF14] transition-all"
              >
                Browse Full Library
              </motion.button>
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
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-2xl font-bold focus:outline-none focus:border-[#39FF14] transition-colors text-center placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
          className="mt-8 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          © 2026 Biological Age Matrix
        </motion.div>
      </motion.div>

      {/* Full Library Modal */}
      <AnimatePresence>
        {isLibraryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111] border border-zinc-800 w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <h2 className="text-2xl font-black italic tracking-tighter">
                  CREATURE <span className="text-[#39FF14]">LIBRARY</span>
                </h2>
                <button 
                  onClick={() => setIsLibraryOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search and Filter */}
              <div className="p-6 space-y-6 bg-zinc-900/30">
                <div className="relative">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search animals..."
                    className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl px-5 py-3 font-medium focus:outline-none focus:border-[#39FF14] transition-all placeholder:text-zinc-600"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['All', ...Object.keys(ANIMAL_CATEGORIES)].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${\n                        activeCategory === cat \n                          ? 'bg-[#39FF14] text-black' \n                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'\n                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animal List */}
              <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredAnimals.map((animal) => (
                  <motion.button
                    key={animal.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAnimal(animal);
                      setIsLibraryOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${\n                        selectedAnimal?.name === animal.name \n                          ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]' \n                          : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600'\n                      }`}
                  >
                    <span className="text-3xl mb-2">{animal.emoji}</span>
                    <span className="text-xs font-bold uppercase tracking-tight">{animal.name}</span>
                  </motion.button>
                ))}
                {filteredAnimals.length === 0 && (
                  <div className="col-span-full text-center py-12 text-zinc-500 italic">
                    No creatures found matching your search.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
