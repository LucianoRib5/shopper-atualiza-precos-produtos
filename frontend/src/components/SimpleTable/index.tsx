import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IUpdateFileData } from '../../interfaces/IUpdateFileData';
import { formatCurrency } from '../../utils/formatCurrency';

const columns = [
  'Código',
  'Nome',
  'Preço Atual',
  'Novo Preço'
]

type Props = {
  data: IUpdateFileData[]
}

const SimpleTable: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{marginTop: '1rem'}}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {
              columns.map(c => <TableCell align="left" key={c}>{c}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{formatCurrency(row.currentPrice)}</TableCell>
              <TableCell align="left">{formatCurrency(row.newPrice) }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SimpleTable;