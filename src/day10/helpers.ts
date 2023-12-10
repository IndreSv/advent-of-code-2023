import * as fs from 'fs';

const pathsMap = {
  '|': [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ],
  L: [
    { x: 1, y: 0 },
    { x: 0, y: -1 },
  ],
  '-': [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ],
  F: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ],
  J: [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ],
  '7': [
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ],
};

const dirMap = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

export function getInput() {
  const input = fs.readFileSync('src/day10/input.txt').toString().trim();
  return input.split('\n');
}

export async function solveMaze(input: string[]) {
  const allOptions = [];

  for (const dir of dirMap) {
    const seen: boolean[][] = [];
    const startX = input.find((row) => row.includes('S')).indexOf('S');
    const startY = input.indexOf(input.find((row) => row.includes('S')));
    for (let i = 0; i < input.length; i++) {
      seen.push(new Array(input[0].length).fill(false));
    }
    const rest = await walk(
      input,
      { x: startX, y: startY, char: 'S' },
      { x: startX, y: startY, char: 'S' },
      seen,
      [],
      dir,
      true
    );
    allOptions.push(rest);
  }
  const answer = (Math.max(...allOptions.map((p) => p.path.length)) - 1) / 2;
  console.log('ANSWER', answer);
  return answer;
}

async function walk(
  maze: string[],
  curr,
  end,
  seen: boolean[][],
  path,
  dir,
  start = false
): Promise<{ done: boolean; path?: any[] }> {
  if (curr.char === '.') {
    return { done: false, path: path };
  }

  //on end
  if (curr.x === end.x && curr.y === end.y && !start) {
    path.push(end);
    return { done: true, path: path };
  }

  if (seen[curr.y][curr.x]) {
    return { done: false, path: path };
  }
  seen[curr.y][curr.x] = true;
  path.push(curr);

  if (curr.char === 'S') {
    if (
      (
        await walk(
          maze,
          {
            x: curr.x + dir.x,
            y: curr.y + dir.y,
            char: maze[curr.y + dir.y][curr.x + dir.x],
          },
          end,
          seen,
          path,
          dir
        )
      ).done
    ) {
      return { done: true, path: path };
    }
  } else {
    for (let i = 0; i < pathsMap[curr.char].length; i++) {
      if (
        (
          await walk(
            maze,
            {
              x: curr.x + pathsMap[curr.char][i].x,
              y: curr.y + pathsMap[curr.char][i].y,
              char: maze[curr.y + pathsMap[curr.char][i].y][
                curr.x + pathsMap[curr.char][i].x
              ],
            },
            end,
            seen,
            path,
            dir
          )
        ).done
      ) {
        return { done: true, path };
      }
    }
  }

  path.pop();
  return { done: false, path: path };
}
