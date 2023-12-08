import { Node, getInput, getSteps, lcm } from './helpers';

function solve() {
  const now = new Date().getTime();
  const { instructions, paths } = getInput();

  // Part 1
  const startingNode = new Node('AAA', paths['AAA'].next, paths['AAA'].prev);
  const answer1 = getSteps(startingNode, paths, instructions, 'part1');
  console.log('PART 1 answer:', answer1);

  //Part 2
  const startPart2 = Object.entries(paths).filter((key) =>
    key[0].endsWith('A')
  ) as [string, { prev: string; next: string }][];
  const startingPaths = [];
  for (const start of startPart2) {
    startingPaths.push({
      value: start[0],
      prev: start[1].prev,
      next: start[1].next,
    });
  }
  const stepsForPart2 = [];
  for (const path of startingPaths) {
    const startingNode = new Node(path.value, path.next, path.prev);
    const steps = getSteps(startingNode, paths, instructions, 'part2');
    stepsForPart2.push(steps);
  }
  const answer2 = stepsForPart2.reduce((acc, curr) => lcm(acc, curr), 1);
  console.log('PART 2 answer:', answer2);

  //50ms
  console.log('ELAPSED', new Date().getTime() - now);
}

solve();

//Part 1 13771
//Part 2 13129439557681
