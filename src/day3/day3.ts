import * as fs from 'fs';
import {
  calculatePowersSum,
  getMatrixComparison,
  getRegexMatches,
} from './helpers';

export function solve() {
  const now = new Date().getTime();
  const input = fs.readFileSync('src/day3/input.txt').toString();
  const splittedInput: { stringValue: string; uniqueMultiplier: number }[] =
    input.split('\n').map((input) => {
      return {
        stringValue: input,
        uniqueMultiplier: Math.floor(100000 + Math.random() * 900000),
      };
    });
  const allMatches: number[] = [];
  const numbersNextGear: { [key: string]: number[] }[] = [];
  for (const s of splittedInput) {
    const matches = getRegexMatches(s.stringValue);
    const comparisonRows = [
      splittedInput[splittedInput.indexOf(s) - 1],
      splittedInput[splittedInput.indexOf(s) + 1],
    ].filter((val) => val?.stringValue);
    for (const values of matches) {
      const previous = {
        value: s.stringValue[Number(values.index) - 1],
        uniqueIndex: s.uniqueMultiplier * Number(values.index),
      };
      const next = {
        value:
          s.stringValue[
            Number(values.index) + Number(String(values.number).length)
          ],
        uniqueIndex:
          s.uniqueMultiplier *
          (Number(values.index) + Number(String(values.number).length) + 1),
      };
      const otherCharactersToCompare = getMatrixComparison(
        comparisonRows,
        values
      );
      const validMatches = [...otherCharactersToCompare, previous, next].filter(
        (val) => val?.value && val.value !== '.'
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
  const powersSum = calculatePowersSum(numbersNextGear);
  console.log(powersSum);

  console.log('TIME ELAPSED', (new Date().getTime() - now) / 1000);
}

solve();

//556367
//89471771
