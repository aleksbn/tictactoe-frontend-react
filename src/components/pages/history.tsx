import React, { useState, useEffect } from "react";
import { IFormState } from "../../models/common";
import { GetGame } from "../../models/dto/getGame";
import { GetGameHistory } from "../../models/dto/getGameHistory";
import { Move } from "../../models/entity/move";
import { gethistory } from "../../services/gameService";
import { getMappedLetters, returnLetter } from "../../utils/gameHelpers";
import { toCapitalCase } from "../../utils/helpers";
import Select from "../common/select";
import Table from "../common/table";
import GameTableCell from "./../game/gameTableCell";
import "../../style/tableStyle.css";

interface HistoryFormState extends IFormState {
  selectedGameId: string;
}

/**
 * Renders the History component displaying game history and details.
 *
 * @return {JSX.Element} The JSX element representing the History component.
 */
const History: React.FC = () => {
  const [state, setState] = useState<HistoryFormState>({
    data: [],
    errors: {},
    selectedGameId: "",
  });

  useEffect(() => {
    /**
     * Fetches data using the gethistory function and updates the state with the retrieved data.
     *
     * @return {Promise<void>} No return value
     */
    const fetchData = async () => {
      const { data } = await gethistory();
      setState((prevState) => ({ ...prevState, data }));
    };

    fetchData();
  }, []);

  /**
   * Updates the selected game ID in the state based on the value of the HTML select element.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The event object containing the value of the select element.
   * @return {void}
   */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({
      ...prevState,
      selectedGameId: e.target.value,
    }));
  };

  /**
   * Generates a small table based on the selected game, displaying game moves and corresponding letters.
   *
   * @return {JSX.Element} The JSX element representing the small table.
   */
  const generateSmallTable = () => {
    const selectedGame = state.data.find(
      (g: GetGameHistory) => g.gameId === state.selectedGameId
    );
    if (!selectedGame) return null;

    const letters = getMappedLetters(
      selectedGame.player1.id,
      selectedGame.player2.id
    );

    return (
      <table
        style={{ width: "100%" }}
        className="regularTable historyGameTable"
      >
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => (
                <GameTableCell
                  key={`${row}-${col}`}
                  value={
                    returnLetter(selectedGame.moves, `${row}${col}`, letters)
                      .letter
                  }
                  styleClass={
                    returnLetter(selectedGame.moves, `${row}${col}`, letters)
                      .styleClass
                  }
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const { data, selectedGameId } = state;
  let winnerName = "";

  const games = data.map(
    (g: any) =>
      new GetGame(
        g.gameId,
        `(${g.gameId} - ${g.player1.nickname} VS ${g.player2.nickname})`
      )
  );

  const columns = ["Player", "Move coordinates"];
  let movesToDisplayInTable = [];
  const gameId = selectedGameId;

  if (gameId) {
    const selectedGame = data.find((g: GetGameHistory) => g.gameId === gameId);
    if (selectedGame) {
      const moves = selectedGame.moves;
      const players = [selectedGame.player1, selectedGame.player2];

      movesToDisplayInTable = moves.map((m: Move) => [
        toCapitalCase(players.find((p) => p.id === m.playerId)?.nickname),
        `Coords: ${m.xCoord} - ${m.yCoord}`,
      ]);

      winnerName =
        players[0].id === selectedGame.winner
          ? toCapitalCase(players[0].nickname)
          : players[1].id === selectedGame.winner
          ? toCapitalCase(players[1].nickname)
          : "Draw";
    }
  }

  return (
    <React.Fragment>
      <h1>Select the game you want to see</h1>
      <Select name="game" label="" options={games} onChange={handleSelect} />
      {selectedGameId && (
        <React.Fragment>
          <div className="row">
            <h2 className="text-center" style={{ margin: 15 }}>
              List of moves
            </h2>
          </div>
          <div className="row">
            <div className="col-7">
              <Table columns={columns} data={movesToDisplayInTable} />
            </div>
            <div className="col-5">{generateSmallTable()}</div>
          </div>
        </React.Fragment>
      )}
      {selectedGameId && winnerName !== "Draw" && (
        <h3>...and the winner is {winnerName}</h3>
      )}
      {selectedGameId && winnerName === "Draw" && (
        <h3>It was a draw. No winner.</h3>
      )}
    </React.Fragment>
  );
};

export default History;
