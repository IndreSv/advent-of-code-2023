import { arrayColumn, getInput } from './helpers';

async function solve() {
  const result: string[] = getInput().flat();
  const moved = [];
  for (const line of result) {
    const updated = [];
    const test = line.split('');
    for (let x = 0; x < line.split('').length; x++) {
      const char = line.split('')[x];
      if (char === 'O') {
        let length = test.length;
        let it = 1;
        while (length >= 0 && test[x - it] === '.') {
          test[x - it] = 'O';
          test[x - it + 1] = '.';
          length--;
          it++;
        }
      }
    }
    moved.push(test);
    moved.push(updated);
  }

  const lines = [];

  for (let i = 0; i < moved[0].length; i++) {
    const line = arrayColumn(moved, i).join('');
    lines.push(line);
  }
  let total = 0;
  lines.reverse().forEach((line, index) => {
    const rocks = line.split('').filter((i) => i === 'O').length;
    const sum = (index + 1) * rocks;
    total = total + sum;
  });

  console.log(total);
}

solve();

//110677  part 1
