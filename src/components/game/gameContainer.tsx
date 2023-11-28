import React from 'react';
import { FormState } from '../../models/common';

interface GameContainerProps {
    gameId: string
}

interface GameContainerState extends FormState {
    gameId: string;
}

class GameContainer extends React.Component<
  GameContainerProps,
  GameContainerState
> {
  render() {
    return <h1>Game container for the game {this.props.gameId}</h1>;
  }
}

export default GameContainer;
