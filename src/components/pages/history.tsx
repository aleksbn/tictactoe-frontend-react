import React, { Component } from 'react';
import { FormState } from '../../models/common';
import { GetGame } from '../../models/dto/getGame';
import { GetGameHistory } from '../../models/dto/getGameHistory';
import { Move } from '../../models/entity/move';
import { gethistory } from '../../services/gameService';
import Select from '../common/select';
import Table from '../common/table';

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

  render() {
    const { data, selectedGameId } = this.state;
    let winnerName = '';
    const games = data.map((g: any) => {
      return new GetGame(
        g.gameId,
        `(${g.gameId} - ${g.player1.nickname} VS ${g.player2.nickname})`
      );
    });

    const columns = ['Player', 'Move'];
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
          players.filter((p) => p.id === m.playerId)[0].nickname,
          `Coords: ${m.xCoord} - ${m.yCoord}`,
        ];
      });
      winnerName = players[0].id === selectedGame.winnerId ? players[0].nickname : players[1].nickname;
    }

    return (
      <React.Fragment>
        <h1>Select the game you want to see</h1>
        <Select
          name="game"
          label="Game"
          options={games}
          onChange={this.handleSelect}
        />
        {this.state.selectedGameId && (
          <div className="row">
            <div className="col-8">
              <h2 className="text-center">Table data</h2>
              <Table columns={columns} data={movesToDisplayInTable} />
            </div>
            <div className="col-4"></div>
          </div>
        )}
        {this.state.selectedGameId && <h3>...and the winner is {winnerName}</h3>}
      </React.Fragment>
    );
  }
}

export default History;
