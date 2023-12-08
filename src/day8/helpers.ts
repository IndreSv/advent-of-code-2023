import * as fs from 'fs';

export class Node {
  value: string;
  next?: string;
  prev?: string;
  constructor(value: string, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

export function getInput() {
  const input = fs.readFileSync('src/day8/input.txt').toString().trim();
  const lines = input.trim().split('\n');
  const instructions = lines[0];
  const paths = lines
    .slice(1)
    .filter((line) => line)
    .map((l) => {
      const splitted = l.split(' = ');
      const prev = splitted[1].split(',')[0].replaceAll('(', '').trim();
      const next = splitted[1].split(',')[1].replaceAll(')', '').trim();
      return { next, prev, value: splitted[0] };
    });
  const reduced = paths.reduce((acc, item) => {
    acc = { ...acc, [item.value]: { next: item.next, prev: item.prev } };
    return acc;
  }, {});
  return { instructions, paths: reduced };
}

function gcd(a: number, b: number): number {
  return a === 0 ? b : gcd(b % a, a);
}

export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export function getSteps(
  curr,
  paths,
  instructions: string,
  condition: 'part1' | 'part2'
) {
  const instructionsList = instructions.split('');
  let steps = 0;
  let instructionOrder = 0;
  while (
    condition === 'part1' ? curr.value !== 'ZZZ' : !curr.value.endsWith('Z')
  ) {
    if (instructionsList[instructionOrder] === 'R') {
      const path = paths[curr.next];
      curr.value = curr.next;
      curr.next = path.next;
      curr.prev = path.prev;
    } else {
      const path = paths[curr.prev];
      curr.value = curr.prev;
      curr.next = path.next;
      curr.prev = path.prev;
    }
    steps++;
    instructionOrder =
      instructionOrder + 1 < instructionsList.length ? instructionOrder + 1 : 0;
  }
  return steps;
}
