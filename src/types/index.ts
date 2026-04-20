export interface Animal {
  id: string;
  name: string;
  type: string;
  habitat: string;
  description: string;
  funFact: string;
  category: AnimalCategory;
  imageKey: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  diet: string;
  lifespan: string;
  size: string;
  weight: string;
  conservationStatus: string;
  region: string;
  interestingFacts: string[];
}

export type AnimalCategory = 'Mammals' | 'Birds' | 'Reptiles';

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  key: string;
  text: string;
  type: 'A' | 'B' | 'C' | 'D';
}

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  imageKey: string;
}

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  Explore: undefined;
  Facts: undefined;
  Map: undefined;
  Quiz: undefined;
  Crossword: undefined;
};

export type ExploreStackParamList = {
  ExploreList: undefined;
  AnimalDetail: { animalId: string };
};

export type MapStackParamList = {
  MapView: undefined;
  MapAnimalDetail: { animalId: string };
};