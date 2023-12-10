import { FC } from 'react';
import { Move } from '../../models/entity/move';
import '../../style/gameContainerStyle.css';
import { returnLetter } from './../../utils/gameHelpers';

interface GameBoardProps {
  data: any;
  makeAMove: any;
}

const GameBoard: FC<GameBoardProps> = ({ data, makeAMove }) => {
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
        {[0, 1, 2].map((col) => (
          <td
            key={`cell${0}${col}`}
            className={`tableCell ${
              returnLetter(moves, `0${col}`, letters).styleClass
            }`}
            onClick={() => makeAMove(`0${col}`)}
            id={`cell0${col}`}
          >
            {returnLetter(moves, `0${col}`, letters).letter}
          </td>
        ))}
      </tr>
      <tr>
        {[0, 1, 2].map((col) => (
          <td
            key={`cell${1}${col}`}
            className={`tableCell ${
              returnLetter(moves, `1${col}`, letters).styleClass
            }`}
            onClick={() => makeAMove(`1${col}`)}
            id={`cell1${col}`}
          >
            {returnLetter(moves, `1${col}`, letters).letter}
          </td>
        ))}
      </tr>
      <tr>
        {[0, 1, 2].map((col) => (
          <td
            key={`cell${2}${col}`}
            className={`tableCell ${
              returnLetter(moves, `2${col}`, letters).styleClass
            }`}
            onClick={() => makeAMove(`2${col}`)}
            id={`cell2${col}`}
          >
            {returnLetter(moves, `2${col}`, letters).letter}
          </td>
        ))}
      </tr>
    </tbody>
  );
};

export default GameBoard;
