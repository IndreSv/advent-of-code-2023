import * as fs from 'fs';
import { getNormalizedInput } from './helpers';

export function countGames() {
  const input = fs.readFileSync('src/day2/input.txt').toString();
  const normalizedInput = getNormalizedInput(input);
  const possibleGames: number[] = [];
  const possibleGamesInput = { red: 12, green: 13, blue: 14 };
  const colors = ['red', 'green', 'blue'];
  const powers: number[] = [];
  for (const game of normalizedInput) {
    const flattenGame = Object.values(game).flat(2);
    const isGamePossible = flattenGame.every((item) => {
      return (
        Object.values(item) <= possibleGamesInput[Object.keys(item) as any]
      );
    });
    if (isGamePossible) {
      possibleGames.push(Number(Object.keys(game)));
    }

    const highestValues: number[] = [];
    for (const color of colors) {
      const value = Math.max(
        ...flattenGame
          .filter((item) => Object.keys(item).includes(color))
          .map((item) => Object.values(item))
          .flat()
      );
      highestValues.push(value);
    }

    const multiplied = highestValues.reduce((acc, value) => acc * value, 1);
    powers.push(multiplied);
  }
  /**
   * part one - calculate sum of all possible games
   */
  const sum = possibleGames.reduce((acc, item) => acc + item, 0);
  console.log(sum);
  /**
   * part one - calculate powers sum of least possible cubes
   */
  const powersSum = powers.reduce((acc, item) => acc + item, 0);
  console.log(powersSum);
}

countGames();
