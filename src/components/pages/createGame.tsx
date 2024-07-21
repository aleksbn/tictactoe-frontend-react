import { useEffect } from "react";
import { creategame } from "../../services/gameService";

interface CreateGameProps {
  opponent: string;
}

/**
 * Creates a new game and redirects the user to the game play page.
 *
 * @param {CreateGameProps} opponent - The opponent type, either 'pc' or 'human'.
 * @return {null} This component does not render any content.
 */
const CreateGame: React.FC<CreateGameProps> = ({ opponent }) => {
  useEffect(() => {
    /**
     * Function to fetch game data based on opponent type and redirect to the game play page.
     *
     * @param {string} opponent - the type of opponent ('pc' or 'human')
     * @return {Promise<void>} - does not return anything
     */
    const fetchGameAndRedirect = async () => {
      const { data } =
        opponent === "pc" ? await creategame(true) : await creategame(false);
      window.location.href = `/games/play/${data}`;
    };

    fetchGameAndRedirect();
  }, [opponent]);

  return null;
};

export default CreateGame;
