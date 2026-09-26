import { test } from "vitest";
import { expect } from "vitest";
import runGame from "../index.js";
import calcGame from "./calc.js";
import { captureOutput, seqRandom } from "../test-helpers.js";

// random sequence order inside makeRound: first operand, second operand, operation

test("calc adds two numbers", () => {
  expect(calcGame.makeRound(seqRandom([0.34, 0.15, 0.1]))).toEqual({
    question: "35 + 16",
    answer: "51",
  });
});

test("calc subtracts and can produce a negative result", () => {
  expect(calcGame.makeRound(seqRandom([0.04, 0.98, 0.5]))).toEqual({
    question: "5 - 99",
    answer: "-94",
  });
});

test("calc multiplies two numbers", () => {
  expect(calcGame.makeRound(seqRandom([0.34, 0.15, 0.99]))).toEqual({
    question: "35 * 16",
    answer: "560",
  });
});

test("calc operands stay within 1..100 inclusive", () => {
  expect(calcGame.makeRound(seqRandom([0.99, 0.99, 0]))).toEqual({
    question: "100 + 100",
    answer: "200",
  });
});

test("player wins after three correct answers in a row", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(calcGame, "Sam", () => "51", seqRandom([0.34, 0.15, 0.1]));
  });

  expect(result).toBe(true);
  expect(messages).toEqual([
    "What is the result of the expression?",
    "Question: 35 + 16",
    "Correct!",
    "Question: 35 + 16",
    "Correct!",
    "Question: 35 + 16",
    "Correct!",
    "Congratulations, Sam!",
  ]);
});

test("wrong answer ends the game with the fail message", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(calcGame, "Bill", () => "145", seqRandom([0.34, 0.15, 0.99]));
  });

  expect(result).toBe(false);
  expect(messages).toEqual([
    "What is the result of the expression?",
    "Question: 35 * 16",
    `'145' is wrong answer ;(. Correct answer was '560'.`,
    "Let's try again, Bill!",
  ]);
});
