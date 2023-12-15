import * as fs from 'fs';

export function getInput() {
  return fs.readFileSync('src/day15/input.txt').toString().trim().split(',');
}

export function getBox(fullInput: string) {
  let curr = 0;
  for (const char of fullInput) {
    if (fullInput.length) {
      curr = getRemainder(char, fullInput, curr);
    }
  }
  return curr;
}

export function getRemainder(char: string, fullInput: string, curr: number) {
  const decoded = fullInput.charCodeAt(fullInput.indexOf(char));
  const temp = decoded + curr;
  const multiplied = temp * 17;
  return multiplied % 256;
}

export function getTotalLenses(
  uniqueLenses: string[],
  focalLength: string[][]
): number {
  return uniqueLenses.reduce((acc, item) => {
    const box = getBox(item);
    const i = focalLength[box].find((f) => f.startsWith(item));
    if (i) {
      const strength =
        (focalLength.indexOf(focalLength[box]) + 1) *
        1 *
        (focalLength[box].indexOf(i) + 1) *
        Number(i.split(' ')[1]);
      acc = acc + strength;
    }
    return acc;
  }, 0);
}
