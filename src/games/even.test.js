import { test } from "vitest";
import { expect } from "vitest";
import runGame from "../index.js";
import evenGame, { isEven } from "./even.js";
import { captureOutput, seqRandom } from "../test-helpers.js";

test("isEven returns true for even numbers and false for odd ones", () => {
  expect(isEven(0)).toBe(true);
  expect(isEven(2)).toBe(true);
  expect(isEven(100)).toBe(true);
  expect(isEven(1)).toBe(false);
  expect(isEven(15)).toBe(false);
  expect(isEven(7)).toBe(false);
});

test("even game descriptor produces a numeric question and a yes/no answer", () => {
  expect(evenGame.makeRound(seqRandom([0.04]))).toEqual({ question: "5", answer: "no" });
  expect(evenGame.makeRound(seqRandom([0.99]))).toEqual({ question: "100", answer: "yes" });
});

test("player wins after three correct answers in a row", () => {
  let askCalls = 0;
  const ask = () => ["no", "yes", "no"][askCalls++];

  let result;
  const messages = captureOutput(() => {
    result = runGame(evenGame, "Sam", ask, seqRandom([0.04, 0.99, 0.08]));
  });

  expect(result).toBe(true);
  expect(askCalls).toBe(3);
  expect(messages).toEqual([
    'Answer "yes" if the number is even, otherwise answer "no".',
    "Question: 5",
    "Correct!",
    "Question: 100",
    "Correct!",
    "Question: 9",
    "Correct!",
    "Congratulations, Sam!",
  ]);
});

test("wrong answer ends the game with the fail message", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(evenGame, "Bill", () => "yes", seqRandom([0.04]));
  });

  expect(result).toBe(false);
  expect(messages).toEqual([
    'Answer "yes" if the number is even, otherwise answer "no".',
    "Question: 5",
    `'yes' is wrong answer ;(. Correct answer was 'no'.`,
    "Let's try again, Bill!",
  ]);
});

test("invalid input counts as a wrong answer", () => {
  const messages = captureOutput(() => runGame(evenGame, "Bill", () => "n", seqRandom([0.99])));

  expect(messages).toEqual([
    'Answer "yes" if the number is even, otherwise answer "no".',
    "Question: 100",
    `'n' is wrong answer ;(. Correct answer was 'yes'.`,
    "Let's try again, Bill!",
  ]);
});
