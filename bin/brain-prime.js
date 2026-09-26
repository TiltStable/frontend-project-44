#!/usr/bin/env node

import greetUser from "../src/cli.js";
import runGame from "../src/index.js";
import primeGame from "../src/games/prime.js";

const userName = greetUser();

runGame(primeGame, userName);
