#!/usr/bin/env node

import greetUser from "../src/cli.js";
import runGame from "../src/index.js";
import gcdGame from "../src/games/gcd.js";

const userName = greetUser();

runGame(gcdGame, userName);
