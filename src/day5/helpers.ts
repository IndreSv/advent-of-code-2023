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
        rangeMap.push([
          Number(destinationRangeStart),
          Number(sourceRangeStart),
          Number(length),
        ]);
      });
      acc[orderMapping[key]] = rangeMap;
      return acc;
    }, {});
}

export function getFinalDestination(
  seed: number,
  normalisedInput: {
    [x: number]: [number, number, number][];
  }
) {
  let finalDestination: number;
  const allowedToAdd = [];
  let destination = Number(seed);
  for (const item in normalisedInput) {
    for (const set of normalisedInput[item]) {
      if (destination >= set[1] && set[1] + set[2] >= destination) {
        if (destination >= set[1] && set[1] + set[2] > destination) {
          allowedToAdd.push(set[1] + set[2] - destination);
        }
        destination = set[0] + (destination - set[1]);
        break;
      }
    }
  }
  if (!finalDestination || destination < finalDestination) {
    finalDestination = destination;
  }
  const total = Math.min(...allowedToAdd);
  return [finalDestination, total];
}
