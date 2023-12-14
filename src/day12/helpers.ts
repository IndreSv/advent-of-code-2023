import * as fs from 'fs';

export function getInput() {
  const input = fs.readFileSync('src/day12/input.txt').toString().trim();
  return input.split('\n').map((line) => line.split(' '));
}

export function getOptions(row: string, groups: number[]): number {
  const trimmed = row.replace(/^\.+|\.+$/, '');
  if (trimmed === '') {
    return groups.length ? 0 : 1;
  }
  let result = 0;
  const damagedGroups = trimmed.match(/^#+(?=\.|$)/);
  if (damagedGroups && damagedGroups[0].length === groups[0]) {
    return getOptions(trimmed.slice(groups[0]), groups.slice(1));
  } else if (trimmed.includes('?')) {
    const total = groups.reduce((acc, item) => acc + item, 0);
    result = result + getOptions(trimmed.replace('?', '.'), groups);
    if (trimmed.split('').filter((i) => i === '#').length < total) {
      result = result + getOptions(trimmed.replace('?', '#'), groups);
    }
  }
  return result;
}
