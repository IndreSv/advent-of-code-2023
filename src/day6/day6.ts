import { getInput, getMaxWins, getMergedInput } from './helpers';

function solve() {
  const input = getInput();

  //Part 1
  const numberOfOptions: number[] = [];
  for (const race of input) {
    const wins = getMaxWins(race);

    numberOfOptions.push(wins);
  }
  const result = numberOfOptions.reduce((acc, item) => acc * item, 1);
  console.log(result);

  //Part 2
  const race = getMergedInput();
  const wins = getMaxWins({ time: Number(race[0]), record: Number(race[1]) });
  console.log(wins);
}

solve();

// 625968
//43663323
