import { mock } from "node:test";

export const captureOutput = (run) => {
  const messages = [];
  const log = mock.method(console, "log", (...args) => messages.push(args.join(" ")));
  try {
    run();
  } finally {
    log.mock.restore();
  }
  return messages;
};

export const seqRandom = (values) => {
  let index = 0;
  return () => values[index++ % values.length];
};
