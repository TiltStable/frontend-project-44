import { test } from "node:test";
import assert from "node:assert/strict";
import runGame from "../index.js";
import progressionGame, { buildProgression } from "./progression.js";
import { captureOutput, seqRandom } from "../test-helpers.js";

// random sequence order inside makeRound: start, step, hidden index

test("buildProgression builds an arithmetic progression", () => {
  assert.deepEqual(buildProgression(5, 2), [5, 7, 9, 11, 13, 15, 17, 19, 21, 23]);
  assert.deepEqual(buildProgression(14, 5), [14, 19, 24, 29, 34, 39, 44, 49, 54, 59]);
  assert.deepEqual(buildProgression(1, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("progression descriptor hides a random element and asks for it", () => {
  assert.deepEqual(progressionGame.makeRound(seqRandom([0.04, 0.15, 0.55])), {
    question: "5 7 9 11 13 .. 17 19 21 23",
    answer: "15",
  });
  assert.deepEqual(progressionGame.makeRound(seqRandom([0.13, 0.45, 0.99])), {
    question: "14 19 24 29 34 39 44 49 54 ..",
    answer: "59",
  });
  assert.deepEqual(progressionGame.makeRound(seqRandom([0.19, 0.65, 0.04])), {
    question: ".. 27 34 41 48 55 62 69 76 83",
    answer: "20",
  });
});

test("player wins after three correct answers in a row", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(progressionGame, "Sam", () => "15", seqRandom([0.04, 0.15, 0.55]));
  });

  assert.equal(result, true);
  assert.deepEqual(messages, [
    "What number is missing in the progression?",
    "Question: 5 7 9 11 13 .. 17 19 21 23",
    "Correct!",
    "Question: 5 7 9 11 13 .. 17 19 21 23",
    "Correct!",
    "Question: 5 7 9 11 13 .. 17 19 21 23",
    "Correct!",
    "Congratulations, Sam!",
  ]);
});

test("wrong answer ends the game with the fail message", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(progressionGame, "Bill", () => "1", seqRandom([0.04, 0.15, 0.55]));
  });

  assert.equal(result, false);
  assert.deepEqual(messages, [
    "What number is missing in the progression?",
    "Question: 5 7 9 11 13 .. 17 19 21 23",
    `'1' is wrong answer ;(. Correct answer was '15'.`,
    "Let's try again, Bill!",
  ]);
});
