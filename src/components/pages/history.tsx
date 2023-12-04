import React, { Component } from 'react';
import { FormState } from '../../models/common';
import { GetGame } from '../../models/dto/getGame';
import { GetGameHistory } from '../../models/dto/getGameHistory';
import { Move } from '../../models/entity/move';
import { gethistory } from '../../services/gameService';
import { getMappedLetters, returnLetter } from '../../utils/gameHelpers';
import { toCapitalCase } from '../../utils/helpers';
import Select from '../common/select';
import Table from '../common/table';
import GameTableCell from './../game/gameTableCell';

interface HistoryFormState extends FormState {
  selectedGameId: string;
}

class History extends Component {
  state: HistoryFormState = {
    data: [],
    errors: {},
    selectedGameId: '',
  };

  async componentDidMount() {
    const { data } = await gethistory();
    this.setState({ data });
  }

  handleSelect = (e: any) => {
    const newState = { ...this.state };
    newState.selectedGameId = e.target.value;
    this.setState({ ...newState });
  };

  generateSmallTable() {
    const selectedGame = this.state.data.filter(
      (g: GetGameHistory) => g.gameId === this.state.selectedGameId
    )[0];
    const letters = getMappedLetters(
      selectedGame.player1.id,
      selectedGame.player2.id
    );
    return (
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '00', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '00', letters).styleClass
              }
            ></GameTableCell>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '01', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '01', letters).styleClass
              }
            ></GameTableCell>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '02', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '02', letters).styleClass
              }
            ></GameTableCell>
          </tr>
          <tr>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '10', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '10', letters).styleClass
              }
            ></GameTableCell>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '11', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '11', letters).styleClass
              }
            ></GameTableCell>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '12', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '12', letters).styleClass
              }
            ></GameTableCell>
          </tr>
          <tr>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '20', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '20', letters).styleClass
              }
            ></GameTableCell>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '21', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '21', letters).styleClass
              }
            ></GameTableCell>
            <GameTableCell
              value={returnLetter(selectedGame.moves, '22', letters).letter}
              styleClass={
                returnLetter(selectedGame.moves, '22', letters).styleClass
              }
            ></GameTableCell>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { data, selectedGameId } = this.state;
    let winnerName = '';
    const games = data.map((g: any) => {
      return new GetGame(
        g.gameId,
        `(${g.gameId} - ${g.player1.nickname} VS ${g.player2.nickname})`
      );
    });

    const columns = ['Player', 'Move coordinates'];
    let movesToDisplayInTable = [];
    const gameId = selectedGameId;
    if (gameId) {
      const selectedGame = data.filter(
        (g: GetGameHistory) => g.gameId === selectedGameId
      )[0];
      const moves = selectedGame.moves;
      const players = [selectedGame.player1, selectedGame.player2];
      movesToDisplayInTable = moves.map((m: Move) => {
        return [
          toCapitalCase(players.filter((p) => p.id === m.playerId)[0].nickname),
          `Coords: ${m.xCoord} - ${m.yCoord}`,
        ];
      });
      winnerName =
        players[0].id === selectedGame.winner
          ? toCapitalCase(players[0].nickname)
          : players[1].id === selectedGame.winner
          ? toCapitalCase(players[1].nickname)
          : 'Draw';
    }

    return (
      <React.Fragment>
        <h1>Select the game you want to see</h1>
        <Select
          name="game"
          label=""
          options={games}
          onChange={this.handleSelect}
        />
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
              <div className="col-5">{this.generateSmallTable()}</div>
            </div>
          </React.Fragment>
        )}
        {selectedGameId && winnerName !== 'Draw' && (
          <h3>...and the winner is {winnerName}</h3>
        )}
        {selectedGameId && winnerName === 'Draw' && (
          <h3>It was a draw. No winner.</h3>
        )}
      </React.Fragment>
    );
  }
}

export default History;
