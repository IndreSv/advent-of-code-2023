import * as fs from 'fs';

const numbersMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const wordsAsNumber = [
  'two',
  'three',
  'one',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const actualNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function calibrationSum() {
  const input = fs.readFileSync('src/day1/input.txt').toString();
  const arrayOfCalibration = input.split('\n');
  const sums = arrayOfCalibration.map((item) => {
    const splitted: { item: string; index: number; originalItem: string }[] =
      [];
    [...wordsAsNumber, ...actualNumbers].forEach((matchingNumber) => {
      let modified = item;
      while (modified.match(new RegExp(matchingNumber as string))) {
        splitted.push({
          item: actualNumbers.includes(matchingNumber)
            ? matchingNumber
            : numbersMap[matchingNumber],
          index: modified.indexOf(matchingNumber),
          originalItem: item,
        });

        modified =
          modified.substring(0, modified.indexOf(matchingNumber)) +
          'x'.repeat(matchingNumber.length) +
          modified.substring(
            modified.indexOf(matchingNumber) + matchingNumber.length
          );
      }
    });
    const sorted = splitted.sort((a, b) => a.index - b.index);
    return `${sorted[0].item}${sorted[sorted.length - 1].item}`;
  });

  const finalSum = sums.reduce((acc, item) => Number(acc) + Number(item), 0);
  console.log(finalSum);
}

calibrationSum();
