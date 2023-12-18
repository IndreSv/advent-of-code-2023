import * as fs from 'fs';

export function getInput() {
  return fs.readFileSync('src/day18/input.txt').toString().trim().split('\n');
}

const directionToPath = {
  R: { x: 1, y: 0 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: -1 },
};

const codeToDirection = {
  0: 'R',
  1: 'D',
  2: 'L',
  3: 'U',
};

export function fillOutterLine(
  input: string[],
  curr = { x: 0, y: 0 }
): { coordinates: { x: number; y: number }[]; outterLineLength: number } {
  const coordinates = [];
  let current = curr;
  coordinates.push(current);
  let outterLineLength = 0;

  for (const i of input) {
    const splitted = i.split(' ');
    const direction = splitted[0];
    const length = Number(splitted[1]);

    current = {
      x: current.x + directionToPath[direction].x * length,
      y: current.y + directionToPath[direction].y * length,
    };
    outterLineLength = outterLineLength + length;
    coordinates.push(current);
  }
  return { coordinates, outterLineLength };
}

export function fillOutterLinePart2(
  input: string[],
  curr = { x: 0, y: 0 }
): { coordinates2: { x: number; y: number }[]; outterLineLength2: number } {
  const coordinates2 = [];
  let current = curr;
  coordinates2.push(current);
  let outterLineLength2 = 0;

  for (const i of input) {
    const splitted = i.split(' ');
    const hex = splitted[2].substring(2, 8);
    const length = parseInt(hex.substring(0, 5), 16);
    const directionCode = codeToDirection[hex.substring(5)];
    current = {
      x: current.x + directionToPath[directionCode].x * length,
      y: current.y + directionToPath[directionCode].y * length,
    };
    outterLineLength2 = outterLineLength2 + length;
    coordinates2.push(current);
  }
  return { coordinates2, outterLineLength2 };
}

export function totalFilled(
  coordinates: { x: number; y: number }[],
  perimeter: number
) {
  let filledArea = perimeter;
  for (let i = 0; i < coordinates.length - 1; i++) {
    filledArea =
      filledArea +
      (coordinates[i].y + coordinates[i + 1].y) *
        (coordinates[i].x - coordinates[i + 1].x);
  }
  return filledArea / 2 + 1;
}
