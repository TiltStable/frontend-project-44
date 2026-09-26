import { test, vi } from "vitest";
import { expect } from "vitest";
import readlineSync from "readline-sync";
import greetUser from "./cli.js";
import { captureOutput } from "./test-helpers.js";

test("welcomes the user and greets by name", () => {
  let returnedName;
  const messages = captureOutput(() => {
    returnedName = greetUser(() => "John");
  });

  expect(returnedName).toBe("John");
  expect(messages).toEqual(["Welcome to the Brain Games!", "Hello, John!"]);
});

test("greets another user with their own name", () => {
  const messages = captureOutput(() => greetUser(() => "Ivan"));

  expect(messages).toEqual(["Welcome to the Brain Games!", "Hello, Ivan!"]);
});

test("default askName prompts for the name via readline-sync", () => {
  const question = vi.spyOn(readlineSync, "question").mockReturnValue("Ann");
  try {
    const messages = captureOutput(() => greetUser());

    expect(question.mock.calls[0][0]).toBe("May I have your name? ");
    expect(messages).toEqual(["Welcome to the Brain Games!", "Hello, Ann!"]);
  } finally {
    question.mockRestore();
  }
});
