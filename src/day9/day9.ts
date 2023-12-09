import {
  getDifferenceList,
  getInput,
  getPredictionNext,
  getPredictionPrevious,
} from './helpers';

function solve() {
  const now = new Date().getTime();
  const input = getInput();
  const mappedLines = input.map((line) => getDifferenceList(line));

  // Part 1
  const nextResults = mappedLines.map((line) => getPredictionNext(line));
  const result1 = nextResults.reduce((acc, item) => acc + item, 0);
  console.log(result1);

  //Part 2
  const previousResults = mappedLines.map((line) =>
    getPredictionPrevious(line)
  );
  const result2 = previousResults.reduce((acc, item) => acc + item, 0);
  console.log(result2);

  //4ms
  console.log('ELAPSED', new Date().getTime() - now);
}

solve();

//Part 1  2098530125
//Part 2 1016
