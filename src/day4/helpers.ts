export function normalizeInput(
  input: string
): { luckyNumbers: string[]; cardNumbers: string[] }[] {
  return input.split('\n').map((stringifiedInput) => {
    const data = stringifiedInput.split(': ')[1];
    const [luckyNumbers, cardNumbers] = data.split('| ');
    return {
      luckyNumbers: luckyNumbers.split(' '),
      cardNumbers: cardNumbers.split(' '),
    };
  });
}
