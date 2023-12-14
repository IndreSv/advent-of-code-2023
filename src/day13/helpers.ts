import * as fs from 'fs';

export function getInput() {
  const input = fs.readFileSync('src/day13/input.txt').toString().trim();
  const mirrors = input.split('\n\n');
  const result = [];
  for (const mirros of mirrors) {
    const lines = mirros.split('\n');
    const columns = [];
    for (let i = 0; i < lines[0].length; i++) {
      const column = arrayColumn(lines, i).join('');
      columns.push(column);
    }
    result.push({ lines, columns });
  }
  return result;
}

export const arrayColumn = (arr, n) => arr.map((line) => line[n]);

export function getMatchingBreakPoints(input: string[]): number[] {
  return input
    .map((line, index) => {
      if (input[index + 1] === line) {
        return index;
      }
    })
    .filter((val) => val || val === 0);
}

export function getMatchingBreakPointsWithFix(input: string[]): number[] {
  return input
    .map((line, index) => {
      if (input[index + 1] === line) {
        return index;
      }
    })
    .filter((val) => val || val === 0);
}

export function getAllMatches(matches: number[], input: string[]) {
  const allMatches = [];
  for (const match of matches) {
    const indexes = Array.from(new Array(input.length).keys());
    let it = 1;
    let matchLength = 0;
    let unmatchedAtTheStart = 0;
    for (let i = match; i >= 0; i--) {
      const isMatch = input[match + it] && input[i] === input[match + it];

      if (isMatch) {
        matchLength++;
        delete indexes[indexes.indexOf(indexes.find((v) => v === i))];
        delete indexes[indexes.indexOf(indexes.find((v) => v === match + it))];
      } else {
        unmatchedAtTheStart++;
      }
      it++;
    }
    const unmatchAtTheEnd =
      input.length - matchLength * 2 - unmatchedAtTheStart;
    allMatches.push({
      length: matchLength,
      unmatchedAtTheStart,
      unmatchAtTheEnd,
      unusedIndexes: indexes,
    });
  }

  return allMatches;
}

export function getMirrorToStartLength(matches, input): number {
  let result = 0;
  for (const match of matches) {
    const grouped = match.unusedIndexes.reduce((arr, val, i, a) => {
      if (!i || val !== a[i - 1] + 1) arr.push([]);
      arr[arr.length - 1].push(val);
      return arr;
    }, []);
    if (
      match.unusedIndexes.length === 0 ||
      (grouped.length === 1 &&
        (grouped[0][0] === 0 ||
          grouped[0][grouped[0].length - 1] === input.length - 1))
    ) {
      result = match.length + match.unmatchedAtTheStart;
    }
  }
  return result;
}
