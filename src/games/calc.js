const MAX_NUMBER = 100;
const operations = ["+", "-", "*"];

const evaluate = (a, operation, b) => {
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};

const calcGame = {
  task: "What is the result of the expression?",
  makeRound: (random) => {
    const a = 1 + Math.floor(random() * MAX_NUMBER);
    const b = 1 + Math.floor(random() * MAX_NUMBER);
    const operation = operations[Math.floor(random() * operations.length)];
    return { question: `${a} ${operation} ${b}`, answer: String(evaluate(a, operation, b)) };
  },
};

export default calcGame;
