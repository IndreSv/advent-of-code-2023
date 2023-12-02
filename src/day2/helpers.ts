export function getNormalizedInput(input: string) {
  return input.split('\n').map((stringifiedInput) => {
    const [id, data] = stringifiedInput.split(': ');
    const key = id.substring(5);
    const sets = data.split('; ').map((values) => {
      return values
        .split(', ')
        .filter((val) => val)
        .map((item) => {
          const [count, color] = item.split(' ');
          return {
            [color]: Number(count),
          };
        });
    });
    return {
      [key]: sets,
    };
  });
}
