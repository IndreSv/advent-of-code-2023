import * as fs from 'fs';

export function getInput() {
  const input = fs.readFileSync('src/day11/input.txt').toString().trim();
  const lines = input.split('\n');
  const expansions = { horizontal: [], vertical: [] };
  let i = 0;
  for (const line of lines) {
    const isExpandable = !line.replaceAll('.', '').length;
    i++;
    if (isExpandable) {
      expansions.horizontal.push(i - 1);
      continue;
    }
  }

  for (let i = 0; i < lines[0].length; i++) {
    const column = arrayColumn(lines, i);
    if (!column.join('').replaceAll('.', '').length) {
      expansions.vertical.push(i);
    }
  }
  return { newLines2: lines, expansions };
}

const arrayColumn = (arr, n) => arr.map((line) => line[n]);
