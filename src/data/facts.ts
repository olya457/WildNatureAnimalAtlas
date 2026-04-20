export const WILDLIFE_FACTS: string[] = [
  'Octopuses have three hearts and blue blood.',
  'A group of flamingos is called a flamboyance.',
  'Elephants can recognize themselves in a mirror.',
  'Sloths can hold their breath longer than dolphins.',
  'Sharks existed before trees.',
  'A snail can sleep for up to three years.',
  'Kangaroos can\'t walk backwards.',
  'Penguins propose to their mates with pebbles.',
  'Cows have best friends and get stressed when separated.',
  'A giraffe\'s tongue can be over 45 cm long.',
  'Dolphins have names for each other.',
  'Butterflies taste with their feet.',
  'A group of owls is called a parliament.',
  'Tigers have striped skin, not just fur.',
  'Seahorses are the only animals where males give birth.',
  'Wolves can travel over 50 km in a single day.',
  'Frogs can freeze without dying.',
  'Bats are the only flying mammals.',
  'Crocodiles can live over 70 years.',
  'Some turtles can breathe through their butts.',
  'Polar bears have black skin under white fur.',
  'Ants can lift up to 50 times their body weight.',
  'Koalas sleep up to 22 hours a day.',
  'Ravens can mimic human speech.',
  'Jellyfish have been around for over 500 million years.',
  'Horses can sleep both lying down and standing up.',
  'A shrimp\'s heart is located in its head.',
  'Chameleons can move their eyes independently.',
  'Sea otters hold hands while sleeping.',
  'Lizards can detach their tails to escape predators.',
];

export const getRandomFact = (): string => {
  const randomIndex = Math.floor(Math.random() * WILDLIFE_FACTS.length);
  return WILDLIFE_FACTS[randomIndex];
};