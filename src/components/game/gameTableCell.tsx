import { FC } from "react";
import "../../style/tableCellStyle.css";

interface GameTableCellProps {
  value: string | undefined;
  styleClass: string;
}

/**
 * Renders a table cell component with the given value and style class.
 *
 * @param {GameTableCellProps} props - The props object containing the value and style class.
 * @return {JSX.Element} The rendered table cell component.
 */
const GameTableCell: FC<GameTableCellProps> = ({ value, styleClass }) => {
  return (
    <td
      className={`tableHistoryCell ${
        styleClass !== "highlightAsPlayed" ? styleClass : ""
      }`}
    >
      {value}
    </td>
  );
};

export default GameTableCell;
