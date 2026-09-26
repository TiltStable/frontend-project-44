import { test } from "node:test";
import assert from "node:assert/strict";
import runGame from "../index.js";
import gcdGame, { gcd } from "./gcd.js";
import { captureOutput, seqRandom } from "../test-helpers.js";

// random sequence order inside makeRound: first number, second number

test("gcd computes the greatest common divisor", () => {
  assert.equal(gcd(25, 50), 25);
  assert.equal(gcd(100, 52), 4);
  assert.equal(gcd(3, 9), 3);
  assert.equal(gcd(8, 99), 1);
  assert.equal(gcd(7, 7), 7);
  assert.equal(gcd(1, 99), 1);
});

test("gcd game descriptor produces two numbers and their gcd as the answer", () => {
  assert.deepEqual(gcdGame.makeRound(seqRandom([0.24, 0.49])), { question: "25 50", answer: "25" });
  assert.deepEqual(gcdGame.makeRound(seqRandom([0.99, 0.51])), { question: "100 52", answer: "4" });
  assert.deepEqual(gcdGame.makeRound(seqRandom([0.02, 0.08])), { question: "3 9", answer: "3" });
});

test("player wins after three correct answers in a row", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(gcdGame, "Sam", () => "25", seqRandom([0.24, 0.49]));
  });

  assert.equal(result, true);
  assert.deepEqual(messages, [
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

  assert.equal(result, false);
  assert.deepEqual(messages, [
    "Find the greatest common divisor of given numbers.",
    "Question: 25 50",
    `'1' is wrong answer ;(. Correct answer was '25'.`,
    "Let's try again, Bill!",
  ]);
});
