export function toCapitalCase(input: string) {
  return input
    .split(' ')
    .map((word) => {
      let firstChar = word[0];
      firstChar = firstChar.toUpperCase();
      return [firstChar, ...word.slice(1, word.length)].join('');
    })
    .join(' ');
}
