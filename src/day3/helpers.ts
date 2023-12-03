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

export function getMatrixComparison(
  rowsToCompare: { stringValue: string; uniqueMultiplier: number }[],
  values: { number: number; index: string }
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
      value: comp.stringValue.charAt(Number(values.index) - 1),
      uniqueIndex: comp.uniqueMultiplier * Number(values.index),
    });
    items.push({
      value: comp.stringValue.charAt(
        Number(values.index) + Number(String(values.number).length)
      ),
      uniqueIndex:
        comp.uniqueMultiplier *
        (Number(values.index) + Number(String(values.number).length) + 1),
    });
    for (let i = 0; i < String(values.number).length; i++) {
      items.push({
        value: comp.stringValue.charAt(Number(values.index + i)),
        uniqueIndex: comp.uniqueMultiplier * Number(values.index + i + 1),
      });
    }
  });
  return items;
}

export function calculatePowersSum(
  gears: { [key: string]: number[] }[]
): number {
  return (
    gears
      .map((item) => {
        const value = Object.values(item)[0];
        const isValid = value.length > 1;
        if (isValid) {
          const sum = value.reduce((a, b) => a * b, 1);
          return sum;
        }
      })
      .filter((val) => val) as number[]
  ).reduce((acc, item) => acc + item, 0);
}
