import { fillOutterLine, getInput, totalFilled } from './helpers';

function solve() {
  const input = getInput();
  const { coordinates, outterLineLength } = fillOutterLine(input);
  const filled = totalFilled(coordinates, outterLineLength);
  console.log('ANSWER 1:', filled);
}

solve();

//part 1 46359
