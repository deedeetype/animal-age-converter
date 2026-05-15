export interface AnimalData {
  name: string;
  icon: string;
  color: string;
  conversionFactor: (age: number) => number;
  lifeExpectancy: string;
  description: string;
}

export const ANIMALS: Record<string, AnimalData> = {
  dog: {
    name: 'Dog',
    icon: '🐶',
    color: '#FACC15',
    conversionFactor: (age) => {
      if (age <= 1) return age * 12;
      if (age <= 2) return 24 + (age - 2) * 4; // Simplified dog age logic
      return 24 + (age - 2) * 7; // Rough estimate; actual is more complex by breed
    },
    lifeExpectancy: '10-15 years',
    description: 'Man\'s best friend, varying widely by breed size.',
  },
  cat: {
    name: 'Cat',
    icon: '🐱',
    color: '#FB923C',
    conversionFactor: (age) => {
      if (age <= 1) return 15;
      if (age <= 2) return 24;
      return 24 + (age - 2) * 4;
    },
    lifeExpectancy: '12-18 years',
    description: 'Independent and graceful companions.',
  },
  turtle: {
    name: 'Turtle',
    icon: '🐢',
    color: '#4ADE80',
    conversionFactor: (age) => age * 0.1, // Turtles live very long, so human equivalent is slower
    lifeExpectancy: '50-100+ years',
    description: 'The masters of longevity and patience.',
  },
  parrot: {
    name: 'Parrot',
    icon: '🦜',
    color: '#60A5FA',
    conversionFactor: (age) => age * 0.5,
    lifeExpectancy: '30-80 years',
    description: 'Colorful, intelligent, and long-lived talkers.',
  },
  hamster: {
    name: 'Hamster',
    icon: '🐹',
    color: '#FDF2F8',
    conversionFactor: (age) => age * 25,
    lifeExpectancy: '2-3 years',
    description: 'Tiny bundles of energy with short lives.',
  },
  rabbit: {
    name: 'Rabbit',
    icon: '🐰',
    color: '#E2E8F0',
    conversionFactor: (age) => {
      if (age < 1) return age * 20;
      return 20 + (age - 1) * 8;
    },
    lifeExpectancy: '8-12 years',
    description: 'Twitching noses and floppy ears.',
  },
};

export type AnimalType = keyof typeof ANIMALS;
