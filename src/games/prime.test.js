import { test } from "vitest";
import { expect } from "vitest";
import runGame from "../index.js";
import primeGame, { isPrime } from "./prime.js";
import { captureOutput, seqRandom } from "../test-helpers.js";

// random sequence order inside makeRound: the number itself

test("isPrime returns true for primes and false for composites and 1", () => {
  expect(isPrime(2)).toBe(true);
  expect(isPrime(3)).toBe(true);
  expect(isPrime(7)).toBe(true);
  expect(isPrime(13)).toBe(true);
  expect(isPrime(97)).toBe(true);
  expect(isPrime(1)).toBe(false);
  expect(isPrime(4)).toBe(false);
  expect(isPrime(9)).toBe(false);
  expect(isPrime(49)).toBe(false);
  expect(isPrime(100)).toBe(false);
});

test("prime game descriptor produces a number and a yes/no answer", () => {
  expect(primeGame.makeRound(seqRandom([0.06]))).toEqual({ question: "7", answer: "yes" });
  expect(primeGame.makeRound(seqRandom([0.99]))).toEqual({ question: "100", answer: "no" });
  expect(primeGame.makeRound(seqRandom([0.48]))).toEqual({ question: "49", answer: "no" });
});

test("player wins after three correct answers in a row", () => {
  let result;
  const messages = captureOutput(() => {
    result = runGame(primeGame, "Sam", () => "yes", seqRandom([0.06]));
  });

  expect(result).toBe(true);
  expect(messages).toEqual([
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

  expect(result).toBe(false);
  expect(messages).toEqual([
    'Answer "yes" if given number is prime. Otherwise answer "no".',
    "Question: 100",
    `'yes' is wrong answer ;(. Correct answer was 'no'.`,
    "Let's try again, Bill!",
  ]);
});
