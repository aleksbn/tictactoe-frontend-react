import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameContainer from '../game/gameContainer';
import { joingame } from '../../services/gameService';
import ErrorComponent from '../common/error';
import { getnickname } from '../../services/userService';
import { toCapitalCase } from '../../utils/helpers';
import { socketServer } from '../../servers/socketServer';

interface MatchParams {
  id: string;
}

interface PlayGameProps extends RouteComponentProps<MatchParams> {}

class PlayGame extends React.Component<PlayGameProps> {
  state = {
    data: {
      winnerId: '',
      _id: '',
    },
    error: null,
    winner: '',
    gameStatus: 'waiting',
  };

  handlePlay = async (data: any) => {
    socketServer.emit('move', data);
    this.loadData();
  };

  async loadData() {
    const { id } = this.props.match.params;
    try {
      const result: any = await joingame(id);
      socketServer.emit('join', result.data);
      this.setState({ data: result.data });
      if (this.state.data.winnerId) this.setState({ gameFinished: true });
    } catch (ex: any) {
      this.setState({ data: {} });
      const wordsFromErrorMessage = ex.toString().split(' ');
      const errorCode = wordsFromErrorMessage[wordsFromErrorMessage.length - 1];
      let message = '';
      switch (errorCode) {
        case '403':
          message = 'That game already has all players and you cannot join.';
          break;
        case '401':
          message = 'That game has already been done.';
          break;
        case '404':
          message =
            'That game does not exist. Try joining another, or creating one!';
          break;
        default:
          message = 'An unknown error';
      }
      this.setState({ error: { code: errorCode, message: message } });
    }
  }

  async componentDidMount() {
    await this.loadData();

    socketServer.on('playerJoined', (data) => {
      this.setState({ gameStatus: data });
    });

    socketServer.on('playerLeft', (data) => {
      this.setState({ gameStatus: data });
    });

    socketServer.on('gamefinished', async (data) => {
      const winner = (await getnickname(data.winnerId)).data;
      this.setState({ data, gameStatus: 'finished', winner });
    });

    socketServer.on('next', (data) => {
      this.setState({ data });
    });
  }

  async componentWillUnmount() {
    socketServer.emit('leave', this.state.data._id);
  }

  render(): ReactNode {
    const { data, error, winner, gameStatus } = this.state;
    return (
      <React.Fragment>
        {gameStatus === 'ongoing' && (
          <div>
            {Object.keys(data).length > 0 && data.winnerId !== '' && (
              <div style={{ textAlign: 'center' }}>
                <h1>Welcome to the game!</h1>
                <GameContainer data={data} onPlay={this.handlePlay} />
              </div>
            )}
            {Object.keys(data).length === 0 && !!error && (
              <ErrorComponent error={error} />
            )}
          </div>
        )}
        {gameStatus === 'waiting' && (
          <h1>Waiting for another player to join...</h1>
        )}
        {gameStatus === 'left' && (
          <h1>Your opponent left. You cannot finish the game alone.</h1>
        )}
        {gameStatus === 'finished' && (
          <h1>And we have a winner! It's {toCapitalCase(winner)}!</h1>
        )}
      </React.Fragment>
    );
  }
}

export default PlayGame;
