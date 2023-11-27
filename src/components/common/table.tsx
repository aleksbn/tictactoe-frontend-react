import React from 'react';
import TableBody from './tableData';
import TableHeader from './tableHeader';

interface TableProps {
  columns: string[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody data={data} />
    </table>
  );
};

export default Table;
