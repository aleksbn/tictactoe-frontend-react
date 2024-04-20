import { FC } from "react";
import "../../style/tableCellStyle.css";

interface GameTableCellProps {
	value: string | undefined;
	styleClass: string;
}

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
