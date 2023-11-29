import { Component } from 'react';
import { creategame } from '../../services/gameService';

interface CreateGameProps {
  opponent: string;
}

class CreateGame extends Component<CreateGameProps> {
  async componentDidMount() {
    const { opponent } = this.props;
    const { data } =
      opponent === 'pc' ? await creategame(true) : await creategame(false);
    window.location.href = `/games/play/${data}`;
  }
  render() {
    return null;
  }
}

export default CreateGame;
