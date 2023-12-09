import * as fs from 'fs';

export function getInput() {
  const input = fs.readFileSync('src/day9/input.txt').toString().trim();
  return input.split('\n').map((line) =>
    line
      .trim()
      .split(' ')
      .map((item) => Number(item))
  );
}

export function getDifferenceList(line: number[]): number[][] {
  const diffs = [line];

  while (diffs[diffs.length - 1].some((n) => n !== 0)) {
    const lastLine = diffs[diffs.length - 1];
    const newLine = [];
    for (let i = 1; i < lastLine.length; i++) {
      newLine.push(lastLine[i] - lastLine[i - 1]);
    }
    diffs.push(newLine);
  }

  return diffs;
}

export function getPredictionNext(valueDiffs: number[][]): number {
  const diffs = valueDiffs;
  for (let i = diffs.length - 2; i >= 0; i--) {
    const lastOfCurrentLine = diffs[i][diffs[i].length - 1];
    const lastOfPreviousLine = diffs[i + 1][diffs[i + 1].length - 1] || 0;
    diffs[i].push(lastOfCurrentLine + lastOfPreviousLine);
  }
  return diffs[0][diffs[0].length - 1];
}

export function getPredictionPrevious(valueDiffs: number[][]): number {
  const diffs = valueDiffs;
  for (let i = diffs.length - 2; i >= 0; i--) {
    const firstOfCurrentLine = diffs[i][0];
    const firstOfPreviousLines = diffs[i + 1][0] || 0;
    diffs[i].unshift(firstOfCurrentLine - firstOfPreviousLines);
  }
  return diffs[0][0];
}
