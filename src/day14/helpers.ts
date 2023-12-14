import * as fs from 'fs';

export function getInput() {
  const input = fs.readFileSync('src/day14/input.txt').toString().trim();
  const result = [];
  const splitted = input.split('\n');

  const columns = [];
  for (let i = 0; i < splitted[0].length; i++) {
    const column = arrayColumn(splitted, i).join('');
    columns.push(column);
  }
  result.push(columns);
  return result;
}

export const arrayColumn = (arr, n) => arr.map((line) => line[n]);
