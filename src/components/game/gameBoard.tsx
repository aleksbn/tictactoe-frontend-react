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
        <td
          className={`tableCell ${
            returnLetter(moves, '00', letters).styleClass
          }`}
          onClick={() => makeAMove('00')}
          id="cell00"
        >
          {returnLetter(moves, '00', letters).letter}
        </td>
        <td
          className={`tableCell ${
            returnLetter(moves, '01', letters).styleClass
          }`}
          onClick={() => makeAMove('01')}
          id="cell01"
        >
          {returnLetter(moves, '01', letters).letter}
        </td>
        <td
          className={`tableCell ${
            returnLetter(moves, '02', letters).styleClass
          }`}
          onClick={() => makeAMove('02')}
          id="cell02"
        >
          {returnLetter(moves, '02', letters).letter}
        </td>
      </tr>
      <tr>
        <td
          className={`tableCell ${
            returnLetter(moves, '10', letters).styleClass
          }`}
          onClick={() => makeAMove('10')}
          id="cell10"
        >
          {returnLetter(moves, '10', letters).letter}
        </td>
        <td
          className={`tableCell ${
            returnLetter(moves, '11', letters).styleClass
          }`}
          onClick={() => makeAMove('11')}
          id="cell11"
        >
          {returnLetter(moves, '11', letters).letter}
        </td>
        <td
          className={`tableCell ${
            returnLetter(moves, '12', letters).styleClass
          }`}
          onClick={() => makeAMove('12')}
          id="cell12"
        >
          {returnLetter(moves, '12', letters).letter}
        </td>
      </tr>
      <tr>
        <td
          className={`tableCell ${
            returnLetter(moves, '20', letters).styleClass
          }`}
          onClick={() => makeAMove('20')}
          id="cell20"
        >
          {returnLetter(moves, '20', letters).letter}
        </td>
        <td
          className={`tableCell ${
            returnLetter(moves, '21', letters).styleClass
          }`}
          onClick={() => makeAMove('21')}
          id="cell21"
        >
          {returnLetter(moves, '21', letters).letter}
        </td>
        <td
          className={`tableCell ${
            returnLetter(moves, '22', letters).styleClass
          }`}
          onClick={() => makeAMove('22')}
          id="cell22"
        >
          {returnLetter(moves, '22', letters).letter}
        </td>
      </tr>
    </tbody>
  );
};

export default GameBoard;
