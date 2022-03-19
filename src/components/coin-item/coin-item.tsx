import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Coin } from '@/services/api/api.types';

type CoinItemProps = {
  coin: Coin;
};

const CoinItem: React.FC<CoinItemProps> = ({ coin }) => (
  <TableRow>
    <TableCell component={'th'} scope={'row'}>
      {coin.symbol}
    </TableCell>
    <TableCell align={'right'}>{coin.amount}</TableCell>
    <TableCell align={'right'}>{'--'}</TableCell>
  </TableRow>
);

export default CoinItem;
