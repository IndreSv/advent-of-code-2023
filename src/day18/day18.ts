import {
  fillOutterLine,
  fillOutterLinePart2,
  getInput,
  totalFilled,
} from './helpers';

function solve() {
  const input = getInput();
  const { coordinates, outterLineLength } = fillOutterLine(input);
  const filled = totalFilled(coordinates, outterLineLength);
  console.log('ANSWER 1:', filled);

  const { coordinates2, outterLineLength2 } = fillOutterLinePart2(input);
  const filled2 = totalFilled(coordinates2, outterLineLength2);
  console.log('ANSWER 2:', filled2);
}

solve();

//part 1 46359
