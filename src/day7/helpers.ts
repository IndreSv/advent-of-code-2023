import * as fs from 'fs';

export function getInput() {
  const input = fs.readFileSync('src/day7/input.txt').toString().trim();
  const lines = input.split('\n').map((input) => input.split(' '));
  return lines;
}

export const cardStrength = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  '1': 1,
};

export const cardStrengthPart2 = {
  A: 14,
  K: 13,
  Q: 12,
  J: 0,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  '1': 1,
};

export function compareMatches(
  aMatch: boolean,
  bMatch: boolean,
  a: string,
  b: string,
  strengthMap
): 1 | -1 {
  if (aMatch && bMatch) {
    return compareOneByOne(a[0], b[0], strengthMap);
  }
  return aMatch ? 1 : -1;
}

export function compareOneByOne(a: string, b: string, strengMap) {
  let result;
  for (let i = 0; i < a.length; i++) {
    if (strengMap[a[i]] > strengMap[b[i]]) {
      result = 1;
      break;
    }
    if (strengMap[a[i]] < strengMap[b[i]]) {
      result = -1;
      break;
    }
  }
  return result;
}

export function calculateWins(sortedInput: string[][]): number {
  return sortedInput.reduce((acc, item) => {
    return Number(item[1]) * (sortedInput.indexOf(item) + 1) + acc;
  }, 0);
}

function getCharactersLength(input: string): number[] {
  const charCount: { [key: string]: number } = {};

  for (let i = 0; i < input.length; i++) {
    const character = input[i];
    charCount[character] = (charCount[character] || 0) + 1;
  }
  return Object.values(charCount);
}

function getModifiedInputAndJokers(
  input: string,
  calculateJoker: boolean
): { modified: string; jokers: number } {
  if (!calculateJoker) {
    return { modified: input, jokers: 0 };
  }
  const inputWithoutJokers = input.replace(/J/g, '');
  return {
    modified: inputWithoutJokers,
    jokers: input.length - inputWithoutJokers.length,
  };
}

export function getMatch(
  input: string,
  hand: string | number,
  calculateJoker: boolean
) {
  const { modified, jokers } = getModifiedInputAndJokers(input, calculateJoker);
  const charCount = getCharactersLength(modified);
  switch (hand) {
    case 'fullHouse':
      return isFullHouse(jokers, charCount);
    case 'twoPairs':
      return charCount.filter((val) => val === 2)?.length + jokers >= 2
        ? true
        : false;
    case 'onePair':
      return (
        charCount.some((val: number) => val === 2) ||
        charCount.some((val: number) => val + jokers >= 2)
      );
    default:
      return jokers === 5
        ? true
        : charCount.some(
            (val) => val === hand || val + jokers >= (hand as number)
          );
  }
}

function isFullHouse(jokers: number, charCount: number[]) {
  const trippleMatch = charCount.filter((val) => val === 3);
  const doubleMatch = charCount.filter((val) => val === 2);
  let tripple = false;
  let pair = false;
  if (jokers === 0) {
    tripple = !!trippleMatch.length;
    pair = !!doubleMatch.length;
  } else if (
    trippleMatch.length ||
    doubleMatch.length === 2 ||
    (doubleMatch.length && jokers >= 2) ||
    jokers >= 3
  ) {
    tripple = true;
    pair = true;
  }
  return !!(pair && tripple);
}
