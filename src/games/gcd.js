const MAX_NUMBER = 100;

const gcd = (a, b) => {
  let x = a;
  let y = b;
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
};

const gcdGame = {
  task: "Find the greatest common divisor of given numbers.",
  makeRound: (random) => {
    const a = 1 + Math.floor(random() * MAX_NUMBER);
    const b = 1 + Math.floor(random() * MAX_NUMBER);
    return { question: `${a} ${b}`, answer: String(gcd(a, b)) };
  },
};

export default gcdGame;
export { gcd };
