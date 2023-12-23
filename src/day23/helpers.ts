import * as fs from 'fs';

export function getInput() {
  return fs.readFileSync('src/day23/input.txt').toString().trim().split('\n');
}

const dirMap = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

const charMap = {
  '<': { x: -1, y: 0 },
  '>': { x: 1, y: 0 },
  '^': { x: 0, y: -1 },
  v: { x: 0, y: 1 },
};

export async function solveMaze(input: string[], part: number) {
  const seen: boolean[][] = [];
  const path = [];
  const startX = input[0].indexOf('.');
  const endX = input[input.length - 1].indexOf('.');
  const start = { x: startX, y: 0, char: '.' };
  const allPaths = [];
  const end = { x: endX, y: input[input.length - 1].indexOf('.'), char: '.' };
  for (let i = 0; i < input.length; i++) {
    seen.push(new Array(input[0].length).fill(false));
  }
  await walk(input, start, end, seen, path, allPaths, part);

  return Math.max(...allPaths);
}

async function walk(
  maze: string[],
  curr,
  end,
  seen: boolean[][],
  path,
  allPaths,
  part = 1
) {
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    if (!allPaths.length || Math.max(...allPaths) < path.length) {
      allPaths.push(path.length);
    }
    path.pop();
    return;
  }
  if (seen[curr.y][curr.x]) {
    return;
  }

  seen[curr.y][curr.x] = true;
  path.push(curr);

  if (part === 1 && Object.keys(charMap).includes(curr.char)) {
    const next =
      maze[curr.y + charMap[curr.char].y]?.[curr.x + charMap[curr.char].x];
    if (next && next !== '#') {
      await walk(
        maze,
        {
          x: curr.x + charMap[curr.char].x,
          y: curr.y + charMap[curr.char].y,
          char: next,
        },
        end,
        seen,
        path,
        allPaths,
        part
      );
    }
  } else {
    for (let i = 0; i < dirMap.length; i++) {
      const next = maze[curr.y + dirMap[i].y]?.[curr.x + dirMap[i].x];
      if (next && next !== '#') {
        await walk(
          maze,
          {
            x: curr.x + dirMap[i].x,
            y: curr.y + dirMap[i].y,
            char: next,
          },
          end,
          seen,
          path,
          allPaths,
          part
        );
      }
    }
  }

  path.pop();
  seen[curr.y][curr.x] = false;
}
