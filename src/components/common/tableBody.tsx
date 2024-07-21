import React from "react";

interface TableBodyProps {
  data: string[][];
}

/**
 * Renders the body of a table component.
 *
 * @param {TableBodyProps} props - The props for the TableBody component.
 * @param {string[][]} props.data - The data to be rendered in the table body.
 * @return {JSX.Element} The rendered table body.
 */
const TableBody: React.FC<TableBodyProps> = ({ data }) => {
  return (
    <tbody>
      {data.map((item: string[], item_index: number) => (
        <tr key={item_index}>
          {item.map((value: string, value_index: number) => (
            <td key={value_index}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
