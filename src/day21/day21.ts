import { getInput, solveMaze } from './helpers';

function solve() {
  const input = getInput();
  const answer = solveMaze(input);
  console.log('PART 1 answer:', answer);
}

solve();

//Part 1 3709
