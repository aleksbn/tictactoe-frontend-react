import { useEffect } from 'react';
import { creategame } from '../../services/gameService';

interface CreateGameProps {
  opponent: string;
}

const CreateGame: React.FC<CreateGameProps> = ({ opponent }) => {
  useEffect(() => {
    const fetchGameAndRedirect = async () => {
      const { data } = opponent === 'pc' ? await creategame(true) : await creategame(false);
      window.location.href = `/games/play/${data}`;
    };

    fetchGameAndRedirect();
  }, [opponent]);

  return null;
};

export default CreateGame;
