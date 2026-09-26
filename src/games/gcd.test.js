import { test } from "vitest";
import { expect } from "vitest";
import runGame from "../index.js";
import gcdGame, { gcd } from "./gcd.js";
import { captureOutput, seqRandom } from "../test-helpers.js";

// random sequence order inside makeRound: first number, second number

test("gcd computes the greatest common divisor", () => {
  expect(gcd(25, 50)).toBe(25);
  expect(gcd(100, 52)).toBe(4);
  expect(gcd(3, 9)).toBe(3);
  expect(gcd(8, 99)).toBe(1);
  expect(gcd(7, 7)).toBe(7);
  expect(gcd(1, 99)).toBe(1);
});

test("gcd game descriptor produces two numbers and their gcd as the answer", () => {
  expect(gcdGame.makeRound(seqRandom([0.24, 0.49]))).toEqual({ question: "25 50", answer: "25" });
  expect(gcdGame.makeRound(seqRandom([0.99, 0.51]))).toEqual({ question: "100 52", answer: "4" });
  expect(gcdGame.makeRound(seqRandom([0.02, 0.08]))).toEqual({ question: "3 9", answer: "3" });
});

test("player wins after three correct answers in a row", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(gcdGame, "Sam", () => "25", seqRandom([0.24, 0.49]));
  });

  expect(result).toBe(true);
  expect(messages).toEqual([
    "Find the greatest common divisor of given numbers.",
    "Question: 25 50",
    "Correct!",
    "Question: 25 50",
    "Correct!",
    "Question: 25 50",
    "Correct!",
    "Congratulations, Sam!",
  ]);
});

test("wrong answer ends the game with the fail message", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(gcdGame, "Bill", () => "1", seqRandom([0.24, 0.49]));
  });

  expect(result).toBe(false);
  expect(messages).toEqual([
    "Find the greatest common divisor of given numbers.",
    "Question: 25 50",
    `'1' is wrong answer ;(. Correct answer was '25'.`,
    "Let's try again, Bill!",
  ]);
});
