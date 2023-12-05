import { getFinalDestination, getNormalisedInput, getSeeds } from './helpers';

async function solve() {
  const seeds = getSeeds();
  const normalisedInput = getNormalisedInput();

  //PART 1
  const finalDestPart1 = getFinalDestination(seeds, normalisedInput);
  console.log(finalDestPart1);

  //PART 2
  const now = new Date().getTime();

  let finalDestination2: number;
  for (const seed of seeds) {
    if (seeds.indexOf(seed) === 0 || seeds.indexOf(seed) % 2 === 0) {
      let tempRange: number[] = [];
      for (let i = 0; i < seeds[seeds.indexOf(seed) + 1]; i++) {
        tempRange.push(seed + i);
        if (tempRange.length > 1000000) {
          const tempResult = getFinalDestination(tempRange, normalisedInput);
          if (!finalDestination2 || tempResult < finalDestination2) {
            finalDestination2 = tempResult;
          }
          tempRange = [];
        }
      }
      if (tempRange.length) {
        const tempResult = getFinalDestination(tempRange, normalisedInput);
        if (!finalDestination2 || tempResult < finalDestination2) {
          finalDestination2 = tempResult;
        }
        tempRange = [];
      }
    }
  }
  //Takes around 9 minutes, needs to be optimised
  console.log('TIME ELAPSED minutes', (new Date().getTime() - now) / 1000 / 60);
  console.log(finalDestination2);
}

solve();

//457535844
//41222968
