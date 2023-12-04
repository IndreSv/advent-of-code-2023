import * as fs from 'fs';
import { normalizeInput } from './helpers';

function calculateCards() {
  const input = fs.readFileSync('src/day4/input.txt').toString();
  const normalizedInput = normalizeInput(input);
  const totals: number[] = [];

  const scratchCards = new Map(
    normalizedInput.map((i) => [normalizedInput.indexOf(i) + 1, 1])
  );
  for (const set of normalizedInput) {
    const matchingNumbers = set.cardNumbers.filter(
      (number) => number && set.luckyNumbers.includes(number)
    );
    if (matchingNumbers.length) {
      //scratch cards calculation
      const currentIndex = normalizedInput.indexOf(set) + 1;
      const totalOriginal = scratchCards.get(currentIndex) || 1;
      for (let i = 0; i <= matchingNumbers.length - 1; i++) {
        const curr = scratchCards.get(currentIndex + i + 1) || 1;
        if (curr) {
          scratchCards.set(currentIndex + i + 1, curr + 1 * totalOriginal);
        }
      }
    }
    //lucky numbers calculation
    const sum = !matchingNumbers.length
      ? 0
      : matchingNumbers.reduce(
          (acc: number, item) =>
            matchingNumbers.indexOf(item) === 0 ? 1 : acc * 2,
          1
        );
    totals.push(sum);
  }

  //PART 1
  const totalAmounts = totals.reduce((acc, item) => acc + item, 0);
  console.log(totalAmounts);

  //PART 2
  let totalCards = 0;
  scratchCards.forEach((v) => {
    totalCards += v;
  });
  console.log(totalCards);
}

calculateCards();
