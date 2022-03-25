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

const COLUMN_ONE_HEADER_LABEL = 'Token';
const COLUMN_TWO_HEADER_LABEL = 'Quantity';
const COLUMN_THREE_HEADER_LABEL = 'Amount in USD';
const FOOTER_LABEL = 'Total:';
const COIN_LIST_TITLE = 'My current portfolio';

const CoinsList: React.FC = observer(() => {
  const {
    portfolioCoins,
    portfolioTotalAmountInUSD,
    fetchPortfolioCoins,
    fetchCoinCurrencyPrice,
  } = useContext(CoinStore);
  const styles = useStyles();

  useEffect(() => {
    fetchPortfolioCoins();
  }, [fetchPortfolioCoins]);

  useEffect(() => {
    if (portfolioCoins.length) {
      fetchCoinCurrencyPrice(portfolioCoins.map(({ id }) => id));
    }
  }, [portfolioCoins]);

  const renderTableCell = (coin: Coin, index: number): React.ReactNode => (
    <CoinItem coin={coin} key={`${coin.id}-${index}`} />
  );

  return (
    <div className={styles.container}>
      <CoinAddForm />
      {!!portfolioCoins.length && (
        <TableContainer component={Paper}>
          <Typography variant={'h6'} noWrap={true} className={styles.title}>
            {COIN_LIST_TITLE}
          </Typography>
          <Table aria-label={'coin table'}>
            <TableHead>
              <TableRow>
                <TableCell>{COLUMN_ONE_HEADER_LABEL}</TableCell>
                <TableCell align={'right'}>{COLUMN_TWO_HEADER_LABEL}</TableCell>
                <TableCell align={'right'}>
                  {COLUMN_THREE_HEADER_LABEL}
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>{portfolioCoins.map(renderTableCell)}</TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Typography variant={'h6'} noWrap={true}>
                    {FOOTER_LABEL}
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
      )}
    </div>
  );
});

export default CoinsList;
