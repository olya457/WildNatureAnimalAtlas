export const IMAGES = {
  background: require('./background.png'),
  logo: require('./logo.png'),
  onboarding_1: require('./onboarding_1.png'),
  onboarding_2: require('./onboarding_2.png'),
  onboarding_3: require('./onboarding_3.png'),
  onboarding_4: require('./onboarding_4.png'),
  onboarding_5: require('./onboarding_5.png'),
};

export const ANIMAL_IMAGES: { [key: string]: any } = {
  lion: require('./lion.png'),
  elephant: require('./elephant.png'),
  giantPanda: require('./giantPanda.png'),
  wolf: require('./wolf.png'),
  koala: require('./koala.png'),
  tiger: require('./tiger.png'),
  gorilla: require('./gorilla.png'),
  fox: require('./fox.png'),
  polarBear: require('./polarBear.png'),
  dolphin: require('./dolphin.png'),
  eagle: require('./eagle.png'),
  parrot: require('./parrot.png'),
  flamingo: require('./flamingo.png'),
  owl: require('./owl.png'),
  penguin: require('./penguin.png'),
  peacock: require('./peacock.png'),
  swan: require('./swan.png'),
  duck: require('./duck.png'),
  ostrich: require('./ostrich.png'),
  hummingbird: require('./hummingbird.png'),
  crocodile: require('./crocodile.png'),
  snake: require('./snake.png'),
  lizard: require('./lizard.png'),
  turtle: require('./turtle.png'),
  komodoDragon: require('./komodoDragon.png'),
  cobra: require('./cobra.png'),
  alligator: require('./alligator.png'),
  chameleon: require('./chameleon.png'),
  python: require('./python.png'),
  tortoise: require('./tortoise.png'),
};

export const getOnboardingImage = (key: string) => {
  const images: { [key: string]: any } = {
    onboarding_1: IMAGES.onboarding_1,
    onboarding_2: IMAGES.onboarding_2,
    onboarding_3: IMAGES.onboarding_3,
    onboarding_4: IMAGES.onboarding_4,
    onboarding_5: IMAGES.onboarding_5,
  };
  return images[key];
};

export const getAnimalImage = (key: string) => {
  return ANIMAL_IMAGES[key];
};