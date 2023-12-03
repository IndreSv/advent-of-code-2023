export function getRegexMatches(
  input: string
): { number: number; index: string }[] {
  const regex = /\d+/g;
  const matches: { number: number; index: string }[] = [];
  let match;
  while ((match = regex.exec(input)) !== null) {
    matches.push({
      number: Number(match[0]),
      index: match.index,
    });
  }
  return matches;
}

export function findIndex(
  index: number,
  multipliers: { [key: string]: number }[]
): number {
  const match: { [key: string]: number } = multipliers.find(
    (val) => val[index]
  ) as { [key: string]: number };
  return Object.values(match)[0];
}

export function getMatrixComparison(
  rowsToCompare: { value: string; indexInCollection: number }[],
  values: { number: number; index: string },
  uniqueMultipliers: { [key: string]: number }[]
): {
  value: string;
  uniqueIndex: number;
}[] {
  const items: {
    value: string;
    uniqueIndex: number;
  }[] = [];
  rowsToCompare.forEach((comp) => {
    items.push({
      value: comp.value.charAt(Number(values.index) - 1),
      uniqueIndex:
        findIndex(comp.indexInCollection, uniqueMultipliers) *
        Number(values.index),
    });
    items.push({
      value: comp.value.charAt(
        Number(values.index) + Number(String(values.number).length)
      ),
      uniqueIndex:
        findIndex(comp.indexInCollection, uniqueMultipliers) *
        (Number(values.index) + Number(String(values.number).length) + 1),
    });
    for (let i = 0; i < String(values.number).length; i++) {
      items.push({
        value: comp.value.charAt(Number(values.index + i)),
        uniqueIndex:
          findIndex(comp.indexInCollection, uniqueMultipliers) *
          Number(values.index + i + 1),
      });
    }
  });
  return items;
}

export function multiplyValidGears(
  gears: { [key: string]: number[] }[]
): number[] {
  return gears
    .map((item) => {
      const flatten = Object.values(item).flat();
      const isValid = flatten.length > 1;
      if (isValid) {
        const sum = flatten.reduce((a, b) => a * b, 1);
        return sum;
      }
    })
    .filter((val) => val) as number[];
}
