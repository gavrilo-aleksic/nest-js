import { CSSProperties } from 'react';
import { TableContainer } from '@material-ui/core';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@mui/material';

const AppTable = ({
  rows,
  columns,
  style,
}: {
  rows: any[];
  style?: CSSProperties;
  columns: {
    label: string;
    value: string;
    transform?: (value: any) => any;
  }[];
}) => {
  return (
    <TableContainer component={Paper} style={style}>
      <Table size="small">
        <TableHead>
          <TableRow className="app-table-row">
            <TableCell>{columns[0].label}</TableCell>
            {columns
              .filter((_, index) => index)
              .map((column) => (
                <TableCell align="right">{column.label}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column, index) => (
                <TableCell component="th" scope="row" align="right" key={index}>
                  {column.transform
                    ? column.transform(row[column.value])
                    : row[column.value]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;
