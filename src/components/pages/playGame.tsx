import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameContainer from '../game/gameContainer';
import { joingame } from '../../services/gameService';
import ErrorComponent from '../common/error';
import { getnickname } from '../../services/userService';

interface MatchParams {
  id: string;
}

interface PlayGameProps extends RouteComponentProps<MatchParams> {}

class PlayGame extends React.Component<PlayGameProps> {
  state = {
    data: {
      winnerId: '',
    },
    error: null,
    gameFinished: false,
    winner: ''
  };

  handlePlay = async (winnerId: string) => {
    console.log(winnerId);
    if (winnerId) {
      const data = { ...this.state.data };
      data.winnerId = winnerId;
      const winner = (await getnickname(winnerId)).data;
      this.setState({ data, gameFinished: true, winner });
    } else this.loadData();
  };

  async loadData() {
    try {
      const result: any = await joingame(this.props.match.params.id);
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
    this.loadData();
  }

  render(): ReactNode {
    const { data, error, gameFinished, winner } = this.state;

    return (
      <React.Fragment>
        {Object.keys(data).length > 0 &&
          data.winnerId !== '' &&
          !gameFinished && (
            <div style={{ textAlign: 'center' }}>
              <h1>Welcome to the game!</h1>
              <GameContainer data={data} onPlay={this.handlePlay} />
            </div>
          )}
        {Object.keys(data).length === 0 && !!error && !gameFinished && (
          <ErrorComponent error={error} />
        )}
        {data.winnerId && gameFinished && (
          <h1>And we have a winner! It's {winner}</h1>
        )}
      </React.Fragment>
    );
  }
}

export default PlayGame;
