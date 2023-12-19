import * as fs from 'fs';

export function getInput() {
  const [rawRules, input] = fs
    .readFileSync('src/day19/input.txt')
    .toString()
    .trim()
    .split('\n\n');
  const rules = rawRules.split('\n').map((rule) => {
    const key = rule.split('{')[0];
    const value = rule.split('{')[1].replace('}', '').split(',');
    return { [key]: value };
  });
  return {
    rules,
    input: input
      .replaceAll('{', '')
      .replaceAll('}', '')
      .split('\n')
      .map((l) =>
        l.split(',').map((i) => ({ [i.split('=')[0]]: i.split('=')[1] }))
      ),
  };
}

export function getAccepted(c: unknown, rules, iterator): boolean {
  for (const condition of Object.values(c)[0]) {
    if (condition === 'A') {
      return true;
    }
    if (condition === 'R') {
      return false;
    }
    if (!condition.includes('<') && !condition.includes('>')) {
      const newDest = rules.find((rule) => Object.keys(rule)[0] === condition);
      return getAccepted(newDest, rules, iterator);
    }
    const [cond, dest] = condition.split(':');
    const value = iterator.find(
      (v) => Object.keys(v)[0] === cond.substring(0, 1)
    );
    const sign = cond.substring(1, 2);
    const numb = cond.substring(2);
    if (sign === '>') {
      if (Number(Object.values(value)[0]) > Number(numb)) {
        return compareDest(dest, rules, iterator);
      }
    } else {
      if (Number(Object.values(value)[0]) < Number(numb)) {
        return compareDest(dest, rules, iterator);
      }
    }
  }
}

function compareDest(dest: string, rules: any[], iterator) {
  if (dest === 'A') {
    return true;
  }
  if (dest === 'R') {
    return false;
  }
  const newDest = rules.find((rule) => Object.keys(rule)[0] === dest);

  return getAccepted(newDest, rules, iterator);
}
