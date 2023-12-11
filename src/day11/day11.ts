import { getInput } from './helpers';

async function solve() {
  const { newLines2, expansions } = getInput();

  const pairs = [];
  let y = 0;
  for (const line of newLines2) {
    let x = 0;
    for (const char of line) {
      if (char === '#') {
        pairs.push({ x, y });
      }
      x++;
    }
    y++;
  }

  const result1 = findPaths(pairs, expansions, 1);
  console.log(result1);

  const result2 = findPaths(pairs, expansions, 1000000 - 1);
  console.log(result2);
}

solve();

//Part 1 10033566
//Part 2 560822911938

function findPaths(pairs: any[], expansions, it = 1) {
  const pathToPair = [];
  const p = pairs.map((v, i) => pairs.slice(i + 1).map((w) => [v, w])).flat();
  for (const pair of p) {
    const minX = Math.min(pair[1].x, pair[0].x);
    const maxX = Math.max(pair[1].x, pair[0].x);
    const min = Math.min(pair[1].y, pair[0].y);
    const max = Math.max(pair[1].y, pair[0].y);
    const inBetween =
      expansions.vertical.filter((h) => h >= minX && h < maxX).length +
      expansions.horizontal.filter((h) => h >= min && h < max).length;
    const steps = max + maxX - minX - min + inBetween * it;
    pathToPair.push(steps);
  }
  return pathToPair.map((o) => o).reduce((acc, item) => acc + item, 0);
}
