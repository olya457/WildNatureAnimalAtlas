export interface CrosswordWord {
  id: number;
  answer: string;
  length: number;
  hints: string[];
  revealedIndices: number[];
}

export const CROSSWORD_WORDS: CrosswordWord[] = [
  { id: 1, answer: 'LION', length: 4, hints: ['Big cat', 'Lives in savannah', 'King of animals'], revealedIndices: [0] },
  { id: 2, answer: 'TIGER', length: 5, hints: ['Striped predator', 'Big cat', 'Lives in Asia'], revealedIndices: [0] },
  { id: 3, answer: 'WOLF', length: 4, hints: ['Lives in packs', 'Howls at night', 'Wild canine'], revealedIndices: [0] },
  { id: 4, answer: 'FOX', length: 3, hints: ['Clever animal', 'Red fur', 'Bushy tail'], revealedIndices: [0] },
  { id: 5, answer: 'BEAR', length: 4, hints: ['Large mammal', 'Loves honey', 'Forest animal'], revealedIndices: [0] },
  { id: 6, answer: 'DOLPHIN', length: 7, hints: ['Smart sea animal', 'Swims fast', 'Makes clicks'], revealedIndices: [0] },
  { id: 7, answer: 'SHARK', length: 5, hints: ['Ocean predator', 'Sharp teeth', 'Fish hunter'], revealedIndices: [0] },
  { id: 8, answer: 'EAGLE', length: 5, hints: ['Bird of prey', 'Sharp vision', 'Flies high'], revealedIndices: [0] },
  { id: 9, answer: 'OWL', length: 3, hints: ['Active at night', 'Big eyes', 'Wise bird'], revealedIndices: [0] },
  { id: 10, answer: 'SWAN', length: 4, hints: ['White bird', 'Lives on lakes', 'Long neck'], revealedIndices: [0] },
  { id: 11, answer: 'DUCK', length: 4, hints: ['Water bird', 'Says quack', 'Has a bill'], revealedIndices: [0] },
  { id: 12, answer: 'PENGUIN', length: 7, hints: ['Cannot fly', 'Lives in cold places', 'Black and white bird'], revealedIndices: [0] },
  { id: 13, answer: 'PARROT', length: 6, hints: ['Colorful bird', 'Can copy sounds', 'Tropical animal'], revealedIndices: [0] },
  { id: 14, answer: 'FLAMINGO', length: 8, hints: ['Pink bird', 'Stands on one leg', 'Lives near water'], revealedIndices: [0] },
  { id: 15, answer: 'CROCODILE', length: 9, hints: ['River reptile', 'Strong jaws', 'Dangerous hunter'], revealedIndices: [0] },
  { id: 16, answer: 'SNAKE', length: 5, hints: ['No legs', 'Reptile', 'Can be venomous'], revealedIndices: [0] },
  { id: 17, answer: 'TURTLE', length: 6, hints: ['Has a shell', 'Slow animal', 'Lives in water or land'], revealedIndices: [0] },
  { id: 18, answer: 'LIZARD', length: 6, hints: ['Small reptile', 'Can regrow tail', 'Loves warm places'], revealedIndices: [0] },
  { id: 19, answer: 'PYTHON', length: 6, hints: ['Large snake', 'Squeezes prey', 'Jungle reptile'], revealedIndices: [0] },
  { id: 20, answer: 'KOALA', length: 5, hints: ['Lives in Australia', 'Eats eucalyptus', 'Sleeps a lot'], revealedIndices: [0] },
  { id: 21, answer: 'PANDA', length: 5, hints: ['Black and white', 'Eats bamboo', 'Bear species'], revealedIndices: [0] },
  { id: 22, answer: 'GORILLA', length: 7, hints: ['Large primate', 'Very strong', 'Lives in forests'], revealedIndices: [0] },
  { id: 23, answer: 'ZEBRA', length: 5, hints: ['Black and white stripes', 'African animal', 'Looks like a horse'], revealedIndices: [0] },
  { id: 24, answer: 'GIRAFFE', length: 7, hints: ['Very long neck', 'Eats leaves', 'Tall animal'], revealedIndices: [0] },
  { id: 25, answer: 'HIPPO', length: 5, hints: ['Lives near rivers', 'Huge body', 'Dangerous mammal'], revealedIndices: [0] },
  { id: 26, answer: 'RHINO', length: 5, hints: ['Has a horn', 'Thick skin', 'Heavy animal'], revealedIndices: [0] },
  { id: 27, answer: 'MONKEY', length: 6, hints: ['Climbs trees', 'Playful animal', 'Loves bananas'], revealedIndices: [0] },
  { id: 28, answer: 'CHEETAH', length: 7, hints: ['Fast runner', 'Spotted cat', 'African predator'], revealedIndices: [0] },
  { id: 29, answer: 'OSTRICH', length: 7, hints: ['Biggest bird', 'Cannot fly', 'Runs very fast'], revealedIndices: [0] },
  { id: 30, answer: 'CHAMELEON', length: 9, hints: ['Changes color', 'Reptile', 'Long tongue'], revealedIndices: [0] },
];