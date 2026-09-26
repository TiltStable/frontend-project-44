import readlineSync from "readline-sync";

const ROUNDS_COUNT = 3;

const runGame = (
  game,
  userName,
  ask = (prompt) => readlineSync.question(prompt),
  random = Math.random,
) => {
  console.log(game.task);

  for (let round = 0; round < ROUNDS_COUNT; round += 1) {
    const { question, answer } = game.makeRound(random);
    console.log(`Question: ${question}`);

    const playerAnswer = ask("Your answer: ");

    if (playerAnswer !== answer) {
      console.log(`'${playerAnswer}' is wrong answer ;(. Correct answer was '${answer}'.`);
      console.log(`Let's try again, ${userName}!`);
      return false;
    }

    console.log("Correct!");
  }

  console.log(`Congratulations, ${userName}!`);
  return true;
};

export default runGame;
