/**
 * Converts a string to capital case.
 *
 * @param {string} input - The input string to be converted.
 * @return {string} The input string converted to capital case.
 */
export function toCapitalCase(input: string) {
  return input
    .split(" ")
    .map((word) => {
      let firstChar = word[0];
      firstChar = firstChar.toUpperCase();
      return [firstChar, ...word.slice(1, word.length)].join("");
    })
    .join(" ");
}
