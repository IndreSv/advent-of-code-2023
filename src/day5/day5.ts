import { getFinalDestination, getNormalisedInput, getSeeds } from './helpers';

async function solve() {
  const seeds = getSeeds();
  const normalisedInput = getNormalisedInput();

  //PART 1
  const destinations = [];
  for (const seed of seeds) {
    const finalDestPart1 = getFinalDestination(seed, normalisedInput)[0];
    destinations.push(finalDestPart1);
  }
  const resultPart1 = Math.min(...destinations);
  console.log(resultPart1);

  //PART 2
  let finalDestination2: number;
  for (const seed of seeds) {
    if (seeds.indexOf(seed) === 0 || seeds.indexOf(seed) % 2 === 0) {
      let i = 0;
      while (i < seeds[seeds.indexOf(seed) + 1]) {
        const tempResult = getFinalDestination(seed + i, normalisedInput);
        if (!finalDestination2 || tempResult[0] < finalDestination2) {
          finalDestination2 = tempResult[0];
        }
        i = i + tempResult[1] + 1;
      }
    }
  }
  console.log(finalDestination2);
}

solve();

//457535844
//41222968
