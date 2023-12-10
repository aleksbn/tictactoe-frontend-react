import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameContainer from '../game/gameContainer';
import { joingame, getgame } from '../../services/gameService';
import ErrorComponent from '../common/error';
import { getnickname } from '../../services/userService';
import { toCapitalCase } from '../../utils/helpers';
import { socketServer } from '../../servers/socketServer';
import DialogComponent from './../common/dialog';

interface MatchParams {
  id: string;
}

interface PlayGameProps extends RouteComponentProps<MatchParams> {}

const PlayGame: React.FC<PlayGameProps> = ({ match, history }) => {
  const [data, setData] = useState({
    winnerId: '',
    _id: '',
  });
  const [error, setError] = useState<any>(null);
  const [winner, setWinner] = useState('');
  const [gameStatus, setGameStatus] = useState('waiting');
  const [displayDialog, setDisplayDialog] = useState(true);

  const handlePlay = async (moveData: any, type: string) => {
    if (type === 'data') socketServer.emit('move', moveData);
    else {
      const generatedError = generateError(moveData);
      if (gameStatus === 'finished') {
        generatedError.errorCode = '401';
        generatedError.message = 'That game has already been finished.';
      }
      setError(generatedError);
    }
  };

  const handleErrorClose = () => {
    if (error?.errorCode !== '400' && error?.errorCode !== '405') {
      history.replace('/games');
    }
    setError(null);
  };

  const handleDialogClose = () => {
    setDisplayDialog(false);
  };

  const loadData = async () => {
    const { id } = match.params;
    try {
      let result = await getgame(id);
      if (gameStatus !== 'finished') {
        result = await joingame(id);
        socketServer.emit('join', result.data);
      }
      setData(result.data);
    } catch (ex: any) {
      setData({ winnerId: '', _id: '' });
      setError(generateError(ex));
    }
  };

  const generateError = (error: any) => {
    const wordsFromErrorMessage = error.toString().split(' ');
    const errorCode = wordsFromErrorMessage[wordsFromErrorMessage.length - 1];
    let message = '';
    switch (errorCode) {
      case '400':
        message = 'That move has already been played. Choose another one.';
        break;
      case '401':
        message = 'That game has already been finished.';
        break;
      case '403':
        message = 'That game already has all players and you cannot play.';
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
  };

  useEffect(() => {
    const fetchData = async () => {
      if (gameStatus !== 'finished') await loadData();

      socketServer.on('playerJoined', (data) => {
        setGameStatus(data);
      });

      socketServer.on('playerLeft', (data) => {
        if (gameStatus !== 'finished') setGameStatus(data);
      });

      socketServer.on('gamefinished', async (data) => {
        const gameWinner =
          data.winnerId === 'Draw'
            ? 'Draw'
            : data.winnerId === 'PC'
            ? 'PC'
            : (await getnickname(data.winnerId)).data;
        setData(data);
        setGameStatus('finished');
        setWinner(gameWinner);
      });

      socketServer.on('next', (data) => {
        setData(data);
      });
    };

    fetchData();

    return () => {
      socketServer.emit('leave', data._id);
    };
  }, [gameStatus, data._id]);

  return (
    <>
      {error && <ErrorComponent onClose={handleErrorClose} error={error} />}
      {gameStatus !== 'left' &&
        gameStatus !== 'waiting' &&
        (!error ||
          (error?.errorCode !== '401' && error?.errorCode !== '405')) && (
          <div>
            {Object.keys(data).length > 0 && data.winnerId !== '' && (
              <div style={{ textAlign: 'center' }}>
                <h1>Play the game!</h1>
                <GameContainer data={data} onPlay={handlePlay} />
              </div>
            )}
          </div>
        )}
      {gameStatus === 'waiting' && !error && (
        <>
          <h1>Game ID: {data._id}</h1>
          <h1>Waiting for another player to join...</h1>
        </>
      )}
      {gameStatus === 'left' && !error && (
        <h1>Your opponent left. You cannot finish the game alone.</h1>
      )}
      {gameStatus === 'finished' &&
        !error &&
        winner !== 'Draw' &&
        displayDialog && (
          <DialogComponent
            title={'We have a winner!'}
            message={`It's ${toCapitalCase(winner)}!`}
            onClose={handleDialogClose}
          />
        )}
      {gameStatus === 'finished' &&
        !error &&
        winner === 'Draw' &&
        displayDialog && (
          <DialogComponent
            title={'Winner could not be determined.'}
            message={`It's a draw`}
            onClose={handleDialogClose}
          />
        )}
    </>
  );
};

export default PlayGame;
