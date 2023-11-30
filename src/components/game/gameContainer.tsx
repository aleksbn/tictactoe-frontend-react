import React from 'react';
import { FormState } from '../../models/common';
import { CreateMove } from '../../models/dto/createMove';
import { Move } from '../../models/entity/move';
import { makeamove } from '../../services/gameService';
import auth from '../../services/authService';
import '../../style/gameContainerStyle.css';

interface GameContainerProps {
  data: any;
  onPlay: any;
  style?: {
    [key: string]: any;
  };
}

interface GameContainerState extends FormState {}

class GameContainer extends React.Component<
  GameContainerProps,
  GameContainerState
> {
  state = {
    data: {
      creatorId: '',
      isAgainstPC: false,
      moves: [],
      opponentId: '',
      winnerId: '',
      _id: '',
    },
    errors: {},
  };

  async componentDidMount() {
    const { data } = this.props;
    this.setState({ data });
  }

  async makeAMove(coords: string) {
    try {
      const x = +coords[0];
      const y = +coords[1];
      const user: any = auth.getCurrentUser();
      const result: any = await makeamove(
        this.state.data._id,
        new CreateMove(user._id, x, y)
      );
      delete result.data.__v;
      this.setState({ data: result.data });
      this.props.onPlay(result.data.winnerId);
      // Now, I should inform the other player that the move is played
    } catch (ex) {
      console.log(ex);
    }
  }

  returnMatrixInterface() {
    const { data } = this.state;
    const letters = new Map();
    letters.set(data.creatorId, 'X');
    letters.set(data.opponentId, 'O');
    const moves = data.moves;
    if (data._id !== '' && moves.length > 0) {
      moves.sort((a: Move, b: Move) => {
        if (a.xCoord > b.xCoord) return 1;
        if (a.yCoord > b.yCoord) return 1;
        if (a.xCoord < b.xCoord) return -1;
        if (a.yCoord < b.yCoord) return -1;
        return 0;
      });
    }
    return (
      <tbody>
        <tr>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('00')}
            id="cell00"
            data-cell="00"
          >
            {this.returnLetter(moves, '00', letters)}
          </td>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('01')}
            id="cell01"
            data-cell="01"
          >
            {this.returnLetter(moves, '01', letters)}
          </td>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('02')}
            id="cell02"
            data-cell="02"
          >
            {this.returnLetter(moves, '02', letters)}
          </td>
        </tr>
        <tr>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('10')}
            id="cell10"
            data-cell="10"
          >
            {this.returnLetter(moves, '10', letters)}
          </td>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('11')}
            id="cell11"
            data-cell="11"
          >
            {this.returnLetter(moves, '11', letters)}
          </td>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('12')}
            id="cell12"
            data-cell="12"
          >
            {this.returnLetter(moves, '12', letters)}
          </td>
        </tr>
        <tr>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('20')}
            id="cell20"
            data-cell="20"
          >
            {this.returnLetter(moves, '20', letters)}
          </td>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('21')}
            id="cell21"
            data-cell="21"
          >
            {this.returnLetter(moves, '21', letters)}
          </td>
          <td
            className="tableCell"
            onClick={() => this.makeAMove('22')}
            id="cell22"
            data-cell="22"
          >
            {this.returnLetter(moves, '22', letters)}
          </td>
        </tr>
      </tbody>
    );
  }

  returnLetter(moves: Move[], cellCoors: string, letters: Map<string, string>) {
    if (moves.length === 0) return '';
    const x: number = +cellCoors[0];
    const y: number = +cellCoors[1];
    const move = moves.find((m) => m.xCoord === x && m.yCoord === y);
    if (!!move) return letters.get(move.playerId);
    return '';
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <center>
              <table>{data._id !== '' && this.returnMatrixInterface()}</table>
            </center>
          </div>
        </div>
        <div className="col-2" />
      </React.Fragment>
    );
  }
}

export default GameContainer;
