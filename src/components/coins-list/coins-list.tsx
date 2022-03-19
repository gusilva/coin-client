import React from 'react';
import { Coin } from '@/services/api/api.types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { useStyles } from './coins-list.styles';
import CoinItem from '@/components/coin-item/coin-item';

const data: Coin[] = [
  {
    id: 'ethereum',
    symbol: 'eth',
    amount: 2,
  },
  {
    id: 'bitcoin',
    symbol: 'btc',
    amount: 2,
  },
  {
    id: 'string',
    symbol: 'string',
    amount: 0,
  },
];

const CoinsList: React.FC = () => {
  const styles = useStyles();

  const renderTableCell = (coin: Coin, index: number): React.ReactNode => (
    <CoinItem coin={coin} key={`${coin.id}-${index}`} />
  );

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table aria-label={'simple table'}>
          <TableHead>
            <TableRow>
              <TableCell>{'Token'}</TableCell>
              <TableCell align={'right'}>{'Quantity'}</TableCell>
              <TableCell align={'right'}>{'Amount in USD'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data.map(renderTableCell)}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoinsList;
