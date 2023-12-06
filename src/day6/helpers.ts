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
  const lines = input.split('\n');
  const time = lines[0]
    .split('Time:')[1]
    .split(' ')
    .filter((item) => item)
    .join('');
  const record = lines[1]
    .split('Distance:')[1]
    .split(' ')
    .filter((item) => item)
    .join('');
  return [time, record];
}

export function getMaxWins(time: number, record: number): number {
  let length = 0;
  for (let i = time; i > 0; i--) {
    if ((time - i) * i > record) {
      length++;
    }
  }
  return length;
}
