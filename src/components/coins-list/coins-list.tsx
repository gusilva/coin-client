import React, { useContext, useEffect } from 'react';
import CoinStore from '@/store/CoinStore';
import { observer } from 'mobx-react-lite';
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
import CoinItem from '@/components/coin-item/coin-item';

import { useStyles } from './coins-list.styles';

const CoinsList: React.FC = observer(() => {
  const { coins, fetchPortfolioCoins } = useContext(CoinStore);
  const styles = useStyles();

  useEffect(() => {
    fetchPortfolioCoins();
  }, [fetchPortfolioCoins]);

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
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{coins.map(renderTableCell)}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default CoinsList;
