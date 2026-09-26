import { test, mock } from "node:test";
import assert from "node:assert/strict";
import readlineSync from "readline-sync";
import greetUser from "./cli.js";
import { captureOutput } from "./test-helpers.js";

test("welcomes the user and greets by name", () => {
  let returnedName;
  const messages = captureOutput(() => {
    returnedName = greetUser(() => "John");
  });

  assert.equal(returnedName, "John");
  assert.deepEqual(messages, ["Welcome to the Brain Games!", "Hello, John!"]);
});

test("greets another user with their own name", () => {
  const messages = captureOutput(() => greetUser(() => "Ivan"));

  assert.deepEqual(messages, ["Welcome to the Brain Games!", "Hello, Ivan!"]);
});

test("default askName prompts for the name via readline-sync", () => {
  const question = mock.method(readlineSync, "question", () => "Ann");
  try {
    const messages = captureOutput(() => greetUser());

    assert.equal(question.mock.calls[0].arguments[0], "May I have your name? ");
    assert.deepEqual(messages, ["Welcome to the Brain Games!", "Hello, Ann!"]);
  } finally {
    question.mock.restore();
  }
});
