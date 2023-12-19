import { getAccepted, getInput } from './helpers';

function solve() {
  const { rules, input } = getInput();
  const allAccepted = [];
  const start = rules.find((rule) => Object.keys(rule)[0] === 'in');

  for (const i of input) {
    const accepted = getAccepted(start, rules, i);
    if (accepted) {
      allAccepted.push(i.map((val) => Object.values(val)[0]));
    }
  }

  const sum = allAccepted.flat().reduce((acc, i) => Number(acc) + Number(i), 0);
  console.log(sum, 'PART 1');
}

solve();
//Part 1 432788
