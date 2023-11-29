import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameContainer from '../game/gameContainer';
import { joingame } from '../../services/gameService';

interface MatchParams {
  id: string;
}

interface PlayGameProps extends RouteComponentProps<MatchParams> {}

class PlayGame extends React.Component<PlayGameProps> {
  state = {
    data: {},
  };
  async componentDidMount() {
    try {
      const result = await joingame(this.props.match.params.id);
      this.setState({ data: result.data });
      console.log(result.data);
    } catch (ex: any) {
      console.log(ex);
      this.setState({ data: null });
    }
  }
  render(): ReactNode {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        {this.state.data && (
          <div>
            <h1 style={{textAlign: 'center'}}>Welcome to the game!</h1>
            <GameContainer gameId={id} />
          </div>
        )}
        {!this.state.data && (
          <div>
            <h1>Something went wrong. You can't join this game</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default PlayGame;
