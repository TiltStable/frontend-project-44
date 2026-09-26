const MAX_NUMBER = 100;

const isPrime = (number) => {
  if (number < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor === 0) {
      return false;
    }
  }

  return true;
};

const primeGame = {
  task: 'Answer "yes" if given number is prime. Otherwise answer "no".',
  makeRound: (random) => {
    const number = 1 + Math.floor(random() * MAX_NUMBER);
    return { question: String(number), answer: isPrime(number) ? "yes" : "no" };
  },
};

export default primeGame;
export { isPrime };
