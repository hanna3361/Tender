export type Pet = {
  id: number;
  name: string;
  species: 'cat' | 'dragon' | 'blob' | 'plant' | 'rock';
  happiness: number;
  hunger: number;
  energy: number;
  lastFedAt: Date;
  growth: number;
  habits: Array<Habit>;
};

export type Habit = {
  id: number;
  petId: number;
  name: string;
  category: 'health' | 'fitness' | 'mindfulness' | 'learning' | 'social';
  targetFrequency: number;
  statBoost: 'happiness' | 'hunger' | 'energy';
};

export type Log = {
  id: number;
  petId: number;
  habitId: number;
  date: string;
  note: string;
};
