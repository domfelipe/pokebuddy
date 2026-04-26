#!/usr/bin/env node
import { run } from '../src/cli.js';

run(process.argv.slice(2)).catch((error) => {
  console.error(`\nPokeBuddy crashed: ${error.message}\n`);
  if (process.env.POKEBUDDY_DEBUG === '1') {
    console.error(error.stack);
  }
  process.exit(1);
});
