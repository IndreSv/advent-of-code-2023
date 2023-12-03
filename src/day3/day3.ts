import * as fs from 'fs';
import {
  findIndex,
  getMatrixComparison,
  getRegexMatches,
  multiplyValidGears,
} from './helpers';

export function solve() {
  const now = new Date().getTime();
  const input = fs.readFileSync('src/day3/input.txt').toString();
  const splittedInput = input.split('\n');
  const allMatches: number[] = [];
  const numbersNextGear: { [key: string]: number[] }[] = [];
  const uniqueMultipliers: { [key: string]: number }[] = splittedInput.map(
    (row) => {
      return {
        [splittedInput.indexOf(row)]: Math.floor(
          100000 + Math.random() * 900000
        ),
      };
    }
  );
  for (const s of splittedInput) {
    const matches = getRegexMatches(s);
    const comparisonRows = [
      {
        value: splittedInput[splittedInput.indexOf(s) - 1],
        indexInCollection: splittedInput.indexOf(s) - 1,
      },
      {
        value: splittedInput[splittedInput.indexOf(s) + 1],
        indexInCollection: splittedInput.indexOf(s) + 1,
      },
    ].filter((val) => val.value);
    for (const values of matches) {
      const previous = {
        value: s[Number(values.index) - 1],
        uniqueIndex:
          findIndex(splittedInput.indexOf(s), uniqueMultipliers) *
          Number(values.index),
      };
      const next = {
        value: s[Number(values.index) + Number(String(values.number).length)],
        uniqueIndex:
          findIndex(splittedInput.indexOf(s), uniqueMultipliers) *
          (Number(values.index) + Number(String(values.number).length) + 1),
      };
      const otherCharactersToCompare = getMatrixComparison(
        comparisonRows,
        values,
        uniqueMultipliers
      );
      const validMatches = [...otherCharactersToCompare, previous, next].filter(
        (val) => val.value && val.value !== '.'
      );
      if (validMatches.length) {
        allMatches.push(values.number);
        const matchToStar = validMatches.filter((char) => char.value === '*');
        if (matchToStar.length) {
          for (const star of matchToStar) {
            const key = String(star.uniqueIndex);
            const existingValue = numbersNextGear.find(
              (val) => Object.keys(val)[0] === key
            );
            const value = (
              existingValue ? Object.values(existingValue[key]) : []
            ).concat(values.number);
            numbersNextGear.push({
              [key]: value,
            });
          }
        }
      }
    }
  }

  // Part 1
  const sum = allMatches.reduce((acc, item) => acc + item, 0);
  console.log(sum);

  //Part 2
  const validGears = multiplyValidGears(numbersNextGear);
  const powersSum = validGears.reduce((acc, item) => acc + item, 0);
  console.log(powersSum);

  console.log('TIME ELAPSED', (new Date().getTime() - now) / 1000);
}

solve();

//556367
//89471771
