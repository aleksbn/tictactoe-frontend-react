import React from "react";

interface TableHeaderProps {
  columns: string[];
}

/**
 * Renders the table header based on the provided columns.
 *
 * @param {string[]} columns - An array of column names to be displayed in the table header.
 * @return {JSX.Element} The JSX element representing the table header.
 */
const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
