import { getInput, getMaxWins, getMergedInput } from './helpers';

function solve() {
  const now = new Date().getTime();

  const input = getInput();
  //Part 1
  const numberOfOptions: number[] = [];
  for (const race of input) {
    const wins = getMaxWins(race.time, race.record);
    numberOfOptions.push(wins);
  }
  const result = numberOfOptions.reduce((acc, item) => acc * item, 1);
  console.log(result);

  //Part 2
  const race = getMergedInput();
  const wins = getMaxWins(Number(race[0]), Number(race[1]));
  console.log(wins);
  //53ms for both solutions
  console.log('ELAPSED', new Date().getTime() - now);
}

solve();

// 625968
//43663323
