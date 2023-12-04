import React from 'react';

interface TableBodyProps {
  data: string[][];
}

class TableBody extends React.Component<TableBodyProps> {
  render() {
    const { data } = this.props;

    return (
      <tbody>
        {data.map((item: string[], item_index: number) => (
          <tr key={item_index}>
            {item.map((value: string, value_index: number) => (
                <td key={value_index}>{value}</td>))
            }
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
