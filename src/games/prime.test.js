import { test } from "node:test";
import assert from "node:assert/strict";
import runGame from "../index.js";
import primeGame, { isPrime } from "./prime.js";
import { captureOutput, seqRandom } from "../test-helpers.js";

// random sequence order inside makeRound: the number itself

test("isPrime returns true for primes and false for composites and 1", () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(3), true);
  assert.equal(isPrime(7), true);
  assert.equal(isPrime(13), true);
  assert.equal(isPrime(97), true);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(4), false);
  assert.equal(isPrime(9), false);
  assert.equal(isPrime(49), false);
  assert.equal(isPrime(100), false);
});

test("prime game descriptor produces a number and a yes/no answer", () => {
  assert.deepEqual(primeGame.makeRound(seqRandom([0.06])), { question: "7", answer: "yes" });
  assert.deepEqual(primeGame.makeRound(seqRandom([0.99])), { question: "100", answer: "no" });
  assert.deepEqual(primeGame.makeRound(seqRandom([0.48])), { question: "49", answer: "no" });
});

test("player wins after three correct answers in a row", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(primeGame, "Sam", () => "yes", seqRandom([0.06]));
  });

  assert.equal(result, true);
  assert.deepEqual(messages, [
    'Answer "yes" if given number is prime. Otherwise answer "no".',
    "Question: 7",
    "Correct!",
    "Question: 7",
    "Correct!",
    "Question: 7",
    "Correct!",
    "Congratulations, Sam!",
  ]);
});

test("wrong answer ends the game with the fail message", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(primeGame, "Bill", () => "yes", seqRandom([0.99]));
  });

  assert.equal(result, false);
  assert.deepEqual(messages, [
    'Answer "yes" if given number is prime. Otherwise answer "no".',
    "Question: 100",
    `'yes' is wrong answer ;(. Correct answer was 'no'.`,
    "Let's try again, Bill!",
  ]);
});
