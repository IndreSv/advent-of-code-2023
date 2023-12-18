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
