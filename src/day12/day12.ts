import { getInput, getOptions } from './helpers';

function solve() {
  const input = getInput();
  const totals = [];
  for (const [line, groups] of input) {
    const result = getOptions(line, groups.split(',').map(Number));
    totals.push(result);
  }
  const sum = totals.reduce((acc, item) => acc + item, 0);
  console.log('ANSWER 1', sum);
}

solve();

//Part 1 7084
