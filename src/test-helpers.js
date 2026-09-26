import { vi } from "vitest";

export const captureOutput = (run) => {
  const messages = [];
  const log = vi
    .spyOn(console, "log")
    .mockImplementation((...args) => messages.push(args.join(" ")));
  try {
    run();
  } finally {
    log.mockRestore();
  }
  return messages;
};

export const seqRandom = (values) => {
  let index = 0;
  return () => values[index++ % values.length];
};
