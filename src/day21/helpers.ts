import * as fs from 'fs';

export function getInput() {
  return fs.readFileSync('src/day21/input.txt').toString().trim().split('\n');
}

const dirMap = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

export function solveMaze(input: string[]) {
  const startX = input.find((row) => row.includes('S')).indexOf('S');
  const startY = input.indexOf(input.find((row) => row.includes('S')));
  let total = [{ x: startX, y: startY }];
  for (let s = 0; s < 64; s++) {
    const tiles = [];
    for (const i of total) {
      const seenTiles = walk(input, i);
      seenTiles.forEach((tile) => {
        if (!tiles.find((t) => t.x === tile.x && t.y === tile.y)) {
          tiles.push(tile);
        }
      });
    }
    total = tiles;
  }
  return total.length;
}

function walk(
  maze: string[],
  curr: { x: number; y: number }
): { x: number; y: number }[] {
  const seenTiles = [];
  for (let i = 0; i < dirMap.length; i++) {
    const char = maze[curr.y + dirMap[i].y]?.[curr.x + dirMap[i].x];
    if (char === '.' || char === 'S') {
      seenTiles.push({ y: curr.y + dirMap[i].y, x: curr.x + dirMap[i].x });
    }
  }
  return seenTiles;
}
