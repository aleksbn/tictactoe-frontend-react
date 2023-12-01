import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameContainer from '../game/gameContainer';
import { joingame, getgame } from '../../services/gameService';
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

  handlePlay = async (data: any, type: string) => {
    if (type === 'data') socketServer.emit('move', data);
    else {
      const error = this.generateError(data);
      this.setState({ error });
    }
  };

  handleClose = () => {
    if (
      (this.state.error as any).errorCode !== '400' &&
      (this.state.error as any).errorCode !== '405'
    )
      this.props.history.replace('/games');
    this.setState({ error: null });
  };

  async loadData() {
    const { id } = this.props.match.params;
    try {
      let result = await getgame(id);
      if (this.state.gameStatus !== 'finished') {
        result = await joingame(id);
        socketServer.emit('join', result.data);
      }
      this.setState({ data: result.data });
    } catch (ex: any) {
      this.setState({ data: {} });
      this.setState({ error: this.generateError(ex) });
    }
  }

  generateError(error: any) {
    const wordsFromErrorMessage = error.toString().split(' ');
    const errorCode = wordsFromErrorMessage[wordsFromErrorMessage.length - 1];
    let message = '';
    switch (errorCode) {
      case '400':
        message = 'That move has already been played. Choose another one.';
        break;
      case '401':
        message = 'That game has already been done.';
        break;
      case '403':
        message = 'That game already has all players and you cannot join.';
        break;
      case '404':
        message =
          'That game does not exist. Try joining another, or creating one!';
        break;
      case '405':
        message =
          "It's not your turn! Wait for the other player to make a move.";
        break;
      default:
        message = 'An unknown error';
    }
    return { errorCode, message };
  }

  async componentDidMount() {
    await this.loadData();

    socketServer.on('playerJoined', (data) => {
      this.setState({ gameStatus: data });
    });

    socketServer.on('playerLeft', (data) => {
      if (this.state.gameStatus !== 'finished')
        this.setState({ gameStatus: data });
    });

    socketServer.on('gamefinished', async (data) => {
      const winner =
        data.winnerId === 'Draw'
          ? 'Draw'
          : data.winnerId === 'PC'
          ? 'PC'
          : (await getnickname(data.winnerId)).data;
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
        {error && <ErrorComponent onClose={this.handleClose} error={error} />}
        {gameStatus !== 'left' &&
          gameStatus !== 'waiting' &&
          (!error ||
            ((error as { errorCode: string; message: string }).errorCode !==
              '401' &&
              (error as { errorCode: string; message: string }).errorCode !==
                '405')) && (
            <div>
              {Object.keys(data).length > 0 && data.winnerId !== '' && (
                <div style={{ textAlign: 'center' }}>
                  <h1>Play the game!</h1>
                  <GameContainer data={data} onPlay={this.handlePlay} />
                </div>
              )}
            </div>
          )}
        {gameStatus === 'waiting' && !error && (
          <React.Fragment>
            <h1>Game ID: {data._id}</h1>
            <h1>Waiting for another player to join...</h1>
          </React.Fragment>
        )}
        {gameStatus === 'left' && !error && (
          <h1>Your opponent left. You cannot finish the game alone.</h1>
        )}
        {gameStatus === 'finished' && !error && winner !== 'Draw' && (
          <h1>And we have a winner! It's {toCapitalCase(winner)}!</h1>
        )}
        {gameStatus === 'finished' && !error && winner === 'Draw' && (
          <h1>No winner this time, it's a draw.</h1>
        )}
      </React.Fragment>
    );
  }
}

export default PlayGame;
