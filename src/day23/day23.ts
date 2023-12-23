import { getInput, solveMaze } from './helpers';

async function solve() {
  const input = getInput();
  const answer = await solveMaze(input, 1);
  console.log('PART 1 answer:', answer);
  const answer2 = await solveMaze(input, 2);
  console.log('PART 2 answer:', answer2);
}

solve();

//Part 1 2310
//Part 2 6738
