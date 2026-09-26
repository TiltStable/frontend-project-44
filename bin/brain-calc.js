#!/usr/bin/env node

import greetUser from "../src/cli.js";
import runGame from "../src/index.js";
import calcGame from "../src/games/calc.js";

const userName = greetUser();

runGame(calcGame, userName);
