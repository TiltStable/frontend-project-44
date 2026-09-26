const MAX_NUMBER = 100;

const isEven = (number) => number % 2 === 0;

const evenGame = {
  task: 'Answer "yes" if the number is even, otherwise answer "no".',
  makeRound: (random) => {
    const number = 1 + Math.floor(random() * MAX_NUMBER);
    return { question: String(number), answer: isEven(number) ? "yes" : "no" };
  },
};

export default evenGame;
export { isEven };
