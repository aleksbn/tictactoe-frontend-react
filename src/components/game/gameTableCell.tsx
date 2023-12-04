import { FC } from 'react';
import '../../style/tableCellStyle.css';

interface GameTableCellProps {
  value: any;
  styleClass: string
}

const GameTableCell: FC<GameTableCellProps> = ({ value, styleClass }) => {
  return <td className={`tableGameCell ${styleClass}`}>{value}</td>;
};

export default GameTableCell;
