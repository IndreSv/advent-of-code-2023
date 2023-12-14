import {
  getAllMatches,
  getInput,
  getMatchingBreakPoints,
  getMirrorToStartLength,
} from './helpers';

function solve() {
  const result = getInput();
  let sum = 0;
  for (const mirror of result) {
    const lines = mirror.lines;
    const matchStartPoints = getMatchingBreakPoints(lines);
    const allLineMatches = getAllMatches(matchStartPoints, lines);
    const lineMatch = getMirrorToStartLength(allLineMatches, lines);
    if (lineMatch === 0) {
      const columns = mirror.columns;
      const columnBreakPoints = getMatchingBreakPoints(columns);
      const allColumnMatches = getAllMatches(columnBreakPoints, columns);
      const columnMatch = getMirrorToStartLength(allColumnMatches, columns);
      sum = sum + columnMatch;
    } else {
      sum = sum + lineMatch * 100;
    }
  }

  console.log('result', sum);
}

solve();

//33356  part 1
