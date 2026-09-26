import { test, vi } from "vitest";
import { expect } from "vitest";
import readlineSync from "readline-sync";
import runGame from "./index.js";
import { captureOutput } from "./test-helpers.js";

const makeCountingGame = () => {
  const state = { makeRoundCalls: 0, capturedRandom: undefined };
  const game = {
    task: "Fake task?",
    makeRound: (random) => {
      state.makeRoundCalls += 1;
      state.capturedRandom = random;
      return { question: `${state.makeRoundCalls} + 0`, answer: String(state.makeRoundCalls) };
    },
  };
  return { game, state };
};

test("engine runs three rounds and congratulates when all answers are correct", () => {
  const { game, state } = makeCountingGame();
  const prompts = [];
  const ask = (prompt) => {
    prompts.push(prompt);
    return String(state.makeRoundCalls);
  };

  let result;
  const messages = captureOutput(() => {
    result = runGame(game, "Sam", ask, Math.random);
  });

  expect(result).toBe(true);
  expect(state.makeRoundCalls).toBe(3);
  expect(prompts).toEqual(["Your answer: ", "Your answer: ", "Your answer: "]);
  expect(messages).toEqual([
    "Fake task?",
    "Question: 1 + 0",
    "Correct!",
    "Question: 2 + 0",
    "Correct!",
    "Question: 3 + 0",
    "Correct!",
    "Congratulations, Sam!",
  ]);
});

test("engine stops on the first wrong answer and reports the correct one", () => {
  const { game, state } = makeCountingGame();

  let result;
  const messages = captureOutput(() => {
    result = runGame(game, "Bill", () => "wrong", Math.random);
  });

  expect(result).toBe(false);
  expect(state.makeRoundCalls).toBe(1);
  expect(messages).toEqual([
    "Fake task?",
    "Question: 1 + 0",
    `'wrong' is wrong answer ;(. Correct answer was '1'.`,
    "Let's try again, Bill!",
  ]);
});

test("default random is Math.random passed to makeRound", () => {
  const { game, state } = makeCountingGame();

  captureOutput(() => runGame(game, "Sam", () => "1"));

  expect(state.capturedRandom).toBe(Math.random);
});

test("engine fails safely when a descriptor returns a malformed round", () => {
  let makeRoundCalls = 0;
  const game = {
    task: "Fake task?",
    makeRound: () => {
      makeRoundCalls += 1;
      return {};
    },
  };

  let result;
  const messages = captureOutput(() => {
    result = runGame(game, "Sam", () => "anything", Math.random);
  });

  expect(result).toBe(false);
  expect(makeRoundCalls).toBe(1);
  expect(messages).toHaveLength(4);
});

test("default ask reads the answer via readline-sync", () => {
  const { game, state } = makeCountingGame();
  const question = vi
    .spyOn(readlineSync, "question")
    .mockImplementation(() => String(state.makeRoundCalls));
  try {
    const messages = captureOutput(() => runGame(game, "Ann"));

    expect(question.mock.calls[0][0]).toBe("Your answer: ");
    expect(messages).toEqual([
      "Fake task?",
      "Question: 1 + 0",
      "Correct!",
      "Question: 2 + 0",
      "Correct!",
      "Question: 3 + 0",
      "Correct!",
      "Congratulations, Ann!",
    ]);
  } finally {
    question.mockRestore();
  }
});
