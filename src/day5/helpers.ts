import * as fs from 'fs';

const orderMapping = {
  'seed-to-soil map': 1,
  'soil-to-fertilizer map': 2,
  'fertilizer-to-water map': 3,
  'water-to-light map': 4,
  'light-to-temperature map': 5,
  'temperature-to-humidity map': 6,
  'humidity-to-location map': 7,
};

export function getSeeds() {
  const input = fs.readFileSync('src/day5/input.txt').toString();
  return input
    .split('\n\n')
    .map((set) => {
      const [key, values] = set.split(':');
      if (key === 'seeds') {
        return values.trim().split(' ');
      }
    })
    .flat()
    .filter((val) => val)
    .map((s) => Number(s));
}

export function getNormalisedInput() {
  const input = fs.readFileSync('src/day5/input.txt').toString();
  return input
    .split('\n\n')
    .slice(1)
    .reduce((acc, set) => {
      const [key, values] = set.split(':');
      const trimmedValue = values.trim().split('\n');
      const rangeMap = [];

      trimmedValue.forEach((set) => {
        const [destinationRangeStart, sourceRangeStart, length] =
          set.split(' ');
        rangeMap.push({
          destinationRangeStart: Number(destinationRangeStart),
          sourceRangeStart: Number(sourceRangeStart),
          length: Number(length),
        });
      });
      acc[orderMapping[key]] = rangeMap;
      return acc;
    }, {});
}

export function getFinalDestination(
  seeds: number[],
  normalisedInput: {
    [x: number]: {
      sourceRangeStart: number;
      destinationRangeStart: number;
      length: number;
    }[];
  }
) {
  let finalDestination: number;
  for (const seed of seeds) {
    let destination = Number(seed);
    for (const item in normalisedInput) {
      for (const set of normalisedInput[item]) {
        if (
          destination >= set.sourceRangeStart &&
          set.sourceRangeStart + set.length >= destination
        ) {
          destination =
            set.destinationRangeStart + (destination - set.sourceRangeStart);
          break;
        }
      }
    }
    if (!finalDestination || destination < finalDestination) {
      finalDestination = destination;
    }
  }
  return finalDestination;
}
