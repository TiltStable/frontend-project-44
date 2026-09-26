const PROGRESSION_LENGTH = 10;
const MAX_START = 100;
const MAX_STEP = 10;

const buildProgression = (start, step) =>
  Array.from({ length: PROGRESSION_LENGTH }, (_, index) => start + index * step);

const progressionGame = {
  task: "What number is missing in the progression?",
  makeRound: (random) => {
    const start = 1 + Math.floor(random() * MAX_START);
    const step = 1 + Math.floor(random() * MAX_STEP);
    const hiddenIndex = Math.floor(random() * PROGRESSION_LENGTH);
    const progression = buildProgression(start, step);
    const answer = String(progression[hiddenIndex]);
    progression[hiddenIndex] = "..";
    return { question: progression.join(" "), answer };
  },
};

export default progressionGame;
export { buildProgression };
