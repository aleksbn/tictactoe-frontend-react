import React, { useEffect, useState } from 'react';
import { FormState } from '../../models/common';
import { CreateMove } from '../../models/dto/createMove';
import { makeamove } from '../../services/gameService';
import auth from '../../services/authService';
import GameBoard from './gameBoard';
import '../../style/gameContainerStyle.css';

interface GameContainerProps {
  data: any;
  onPlay: any;
  style?: {
    [key: string]: any;
  };
}

interface GameContainerState extends FormState {}

const GameContainer: React.FC<GameContainerProps> = ({ data: initialData, onPlay, style }) => {
  const [data, setData] = useState<any>({
    creatorId: '',
    isAgainstPC: false,
    moves: [],
    opponentId: '',
    winnerId: '',
    _id: '',
    ...initialData,
  });

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const makeAMove = async (coords: string) => {
    try {
      const x = +coords[0];
      const y = +coords[1];
      const user: any = auth.getCurrentUser();
      const result: any = await makeamove(data._id, new CreateMove(user._id, x, y));
      delete result.data.__v;
      setData(result.data);
      onPlay(result.data, 'data');
    } catch (ex: any) {
      onPlay(ex, 'error');
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2" />
        <div className="col-8">
          <center>
            <table className={'tableBorder'}>
              <GameBoard data={data} makeAMove={makeAMove} />
            </table>
          </center>
        </div>
      </div>
      <div className="col-2" />
    </React.Fragment>
  );
};

export default GameContainer;
