import { getInput, solveMaze } from './helpers';

async function solve() {
  const now = new Date().getTime();
  const input = getInput();
  return solveMaze(input);
}

solve();

//Part 1 6682
//Part 2
