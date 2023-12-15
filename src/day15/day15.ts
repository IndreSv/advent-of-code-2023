import { getBox, getInput, getRemainder, getTotalLenses } from './helpers';

function solve() {
  const input = getInput();
  const sum = [];
  const lenses = [];
  const focalLength = [];
  for (const char of input) {
    let curr = 0;
    for (const t of char.split('')) {
      if (char.length) {
        curr = getRemainder(t, char, curr);
      }
    }
    sum.push(curr);
    const start = char.includes('=') ? char.split('=')[0] : char.split('-')[0];
    lenses.push(start);
    const box = getBox(start);
    if (char.includes('=')) {
      if (focalLength[box]) {
        const existing = focalLength[box].find((it) =>
          it.startsWith(char.split('=')[0])
        );
        if (existing) {
          focalLength[box][focalLength[box].indexOf(existing)] = char.replace(
            '=',
            ' '
          );
        } else {
          focalLength[box] = [...focalLength[box], char.replace('=', ' ')];
        }
      } else {
        focalLength[box] = [char.replace('=', ' ')];
      }
    } else {
      if (focalLength[box]) {
        const existing = focalLength[box].find((it) =>
          it.startsWith(char.split('-')[0])
        );
        if (existing) {
          delete focalLength[box][focalLength[box].indexOf(existing)];
          focalLength[box] = focalLength[box].filter((i) => i);
        }
      }
    }
  }
  const result = sum.reduce((acc, item) => acc + item, 0);
  console.log('ANSWER 1', result);

  const uniqueLenses = Array.from(new Set([...lenses]));
  const resultWithFocalLength = getTotalLenses(uniqueLenses, focalLength);
  console.log('ANSWER 2:', resultWithFocalLength);
}

solve();

//part 1 answer 516657
//part 2 answer 210906
