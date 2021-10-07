import { CSSProperties, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
} from '@mui/material';
import { isDefined } from '../../services/form.utils';

interface AppTableProps {
  onClick?: (row: any) => void;
  onSingleClick?: (row: any) => void;
  rows: any[];
  style?: CSSProperties;
  columns: {
    label: string;
    value: string;
    transform?: (value: any) => any;
  }[];
}
const AppTable = ({
  rows,
  columns,
  style,
  onClick,
  onSingleClick,
}: AppTableProps) => {
  const [selectedRow, setSelectedRow] = useState<number | undefined>();

  return (
    <TableContainer component={Paper} style={style}>
      <Table size="small">
        <TableHead>
          <TableRow className="app-table-row">
            <TableCell>{columns[0].label}</TableCell>
            {columns
              .filter((_, index) => index)
              .map((column, index) => (
                <TableCell align="right" key={index}>
                  {column.label}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              selected={Boolean(selectedRow === row.id)}
              onClick={() => {
                setSelectedRow(row.id);
                onSingleClick?.(row);
              }}
              onDoubleClick={() => onClick?.(row)}
            >
              {columns.map((column, index) => (
                <TableCell component="th" scope="row" align="right" key={index}>
                  {column.transform
                    ? column.transform(row[column.value])
                    : isDefined(row[column.value])
                    ? row[column.value].toString()
                    : '-'}
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
