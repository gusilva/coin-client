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
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import CoinItem from '@/components/coin-item/coin-item';
import CoinAddForm from '@/components/coin-add-form';

import { useStyles } from './coins-list.styles';

const CoinsList: React.FC = observer(() => {
  const {
    portfolioCoins,
    portfolioTotalAmountInUSD,
    fetchPortfolioCoins,
    fetchCryptoCoinsPrice,
  } = useContext(CoinStore);
  const styles = useStyles();

  useEffect(() => {
    fetchPortfolioCoins();
  }, [fetchPortfolioCoins]);

  useEffect(() => {
    if (portfolioCoins.length) {
      fetchCryptoCoinsPrice(portfolioCoins.map(({ id }) => id));
    }
  }, [portfolioCoins]);

  const renderTableCell = (coin: Coin, index: number): React.ReactNode => (
    <CoinItem coin={coin} key={`${coin.id}-${index}`} />
  );

  return (
    <div className={styles.container}>
      <CoinAddForm />
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
          <TableBody>{portfolioCoins.map(renderTableCell)}</TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Typography variant={'h6'} noWrap={true}>
                  {'Total:'}
                </Typography>
              </TableCell>
              <TableCell />
              <TableCell align={'right'}>
                <Typography variant={'body1'} noWrap={true}>
                  {portfolioTotalAmountInUSD}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
});

export default CoinsList;
