import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

interface TableProps {
  columns: string[];
  data: string[][];
}

/**
 * Generates a table component based on the provided columns and data.
 *
 * @param {TableProps} columns - The columns configuration for the table.
 * @param {any[]} data - The data to be displayed in the table.
 * @return {ReactElement} A table React element.
 */
const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="table table-striped">
      <TableHeader columns={columns} />
      <TableBody data={data} />
    </table>
  );
};

export default Table;
