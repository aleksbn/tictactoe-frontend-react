import { Move } from "../models/entity/move";

/**
 * Returns the letter and style class for a given set of moves, cell coordinates, and letter map.
 *
 * @param {Move[]} moves - An array of Move objects representing the moves made in the game.
 * @param {string} cellCoors - A string representing the coordinates of the cell.
 * @param {Map<string, string>} letters - A map of player IDs to their corresponding letters.
 * @return {Object} An object with the letter and style class for the given cell.
 */
export function returnLetter(
  moves: Move[],
  cellCoors: string,
  letters: Map<string, string>
) {
  if (moves.length === 0) return { letter: "", styleClass: "" };
  const x: number = +cellCoors[0];
  const y: number = +cellCoors[1];
  const winningMoveCombos = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"],
  ];

  const winningMoveCombosForTheCell = winningMoveCombos.filter((winningMoves) =>
    winningMoves.some((wm) => wm === cellCoors)
  );

  const player1Moves = moves
    .filter((m) => m.playerId === [...letters.keys()][0])
    .map((m) => "" + m.xCoord + m.yCoord);
  const player2Moves = moves
    .filter((m) => m.playerId === [...letters.keys()][1])
    .map((m) => "" + m.xCoord + m.yCoord);

  const isWinningMove =
    winningMoveCombosForTheCell.some((winningMoveComboForTheCell) =>
      winningMoveComboForTheCell.every((winningMove) =>
        player1Moves.some((pm) => pm === winningMove)
      )
    ) ||
    winningMoveCombosForTheCell.some((winningMoveComboForTheCell) =>
      winningMoveComboForTheCell.every((winningMove) =>
        player2Moves.some((pm) => pm === winningMove)
      )
    );

  const styleClass = isWinningMove ? "highlightAsWining" : "highlightAsPlayed";
  const move = moves.find((m) => m.xCoord === x && m.yCoord === y);
  if (!!move) return { letter: letters.get(move.playerId), styleClass };
  return { letter: "", styleClass: "" };
}

/**
 * Sorts an array of Move objects based on their xCoord and yCoord properties.
 *
 * @param {Move[]} moves - The array of Move objects to be sorted.
 * @return {Move[]} The sorted array of Move objects.
 */
export function sortMoves(moves: Move[]) {
  let sortedMoves: Move[] = [];
  if (moves.length > 0) {
    sortedMoves = [...moves];
    sortedMoves.sort((a: Move, b: Move) => {
      if (a.xCoord > b.xCoord) return 1;
      if (a.yCoord > b.yCoord) return 1;
      if (a.xCoord < b.xCoord) return -1;
      if (a.yCoord < b.yCoord) return -1;
      return 0;
    });
  }
  return sortedMoves;
}

/**
 * Creates a map of player IDs to their corresponding game symbols.
 *
 * @param {string} creatorId - The ID of the creator player.
 * @param {string} opponentId - The ID of the opponent player.
 * @return {Map<string, string>} A map with creatorId mapped to "X" and opponentId mapped to "O".
 */
export function getMappedLetters(
  creatorId: string,
  opponentId: string
): Map<string, string> {
  const letters = new Map<string, string>();
  letters.set(creatorId, "X");
  letters.set(opponentId, "O");
  return letters;
}
