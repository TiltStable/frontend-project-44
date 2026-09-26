#!/usr/bin/env node

import greetUser from "../src/cli.js";
import runGame from "../src/index.js";
import evenGame from "../src/games/even.js";

const userName = greetUser();

runGame(evenGame, userName);
