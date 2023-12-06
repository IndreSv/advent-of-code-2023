import * as fs from 'fs';

export function getInput() {
  const input = [
    { time: 53, record: 250 },
    { time: 91, record: 1330 },
    { time: 67, record: 1081 },
    { time: 68, record: 1025 },
  ];
  return input;
}

export function getMergedInput() {
  const input = fs.readFileSync('src/day6/input.txt').toString();
  const time = input
    .split('\n')[0]
    .split('Time:')[1]
    .split(' ')
    .filter((item) => item)
    .join('');
  const record = input
    .split('\n')[1]
    .split('Distance:')[1]
    .split(' ')
    .filter((item) => item)
    .join('');
  return [time, record];
}

export function getMaxWins(race: { time: number; record: number }): number {
  const allGames = Array.from(Array(race.time).keys(), (n) => n + 1);
  const filteredGames = allGames.filter(
    (item) => (race.time - item) * item > race.record
  );
  const tempMax: number[] = [];
  const tempMin: number[] = [];

  const chunkSize = 100000;
  for (let i = 0; i < filteredGames.length; i += chunkSize) {
    const chunk = filteredGames.slice(i, i + chunkSize);
    tempMax.push(Math.max(...chunk));
    tempMin.push(Math.min(...chunk));
  }
  const maxWins = Math.max(...tempMax);
  const minWins = Math.min(...tempMin);
  return maxWins - minWins + 1;
}
