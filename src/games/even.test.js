import { test } from "node:test";
import assert from "node:assert/strict";
import runGame from "../index.js";
import evenGame, { isEven } from "./even.js";
import { captureOutput, seqRandom } from "../test-helpers.js";

test("isEven returns true for even numbers and false for odd ones", () => {
  assert.equal(isEven(0), true);
  assert.equal(isEven(2), true);
  assert.equal(isEven(100), true);
  assert.equal(isEven(1), false);
  assert.equal(isEven(15), false);
  assert.equal(isEven(7), false);
});

test("even game descriptor produces a numeric question and a yes/no answer", () => {
  assert.deepEqual(evenGame.makeRound(seqRandom([0.04])), { question: "5", answer: "no" });
  assert.deepEqual(evenGame.makeRound(seqRandom([0.99])), { question: "100", answer: "yes" });
});

test("player wins after three correct answers in a row", () => {
  let askCalls = 0;
  const ask = () => ["no", "yes", "no"][askCalls++];

  let result;
  const messages = captureOutput(() => {
    result = runGame(evenGame, "Sam", ask, seqRandom([0.04, 0.99, 0.08]));
  });

  assert.equal(result, true);
  assert.equal(askCalls, 3);
  assert.deepEqual(messages, [
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

  assert.equal(result, false);
  assert.deepEqual(messages, [
    'Answer "yes" if the number is even, otherwise answer "no".',
    "Question: 5",
    `'yes' is wrong answer ;(. Correct answer was 'no'.`,
    "Let's try again, Bill!",
  ]);
});

test("invalid input counts as a wrong answer", () => {
  const messages = captureOutput(() => runGame(evenGame, "Bill", () => "n", seqRandom([0.99])));

  assert.deepEqual(messages, [
    'Answer "yes" if the number is even, otherwise answer "no".',
    "Question: 100",
    `'n' is wrong answer ;(. Correct answer was 'yes'.`,
    "Let's try again, Bill!",
  ]);
});
