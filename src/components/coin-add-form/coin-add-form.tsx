import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CoinStore from '@/store/CoinStore';
import { Button, Grid, TextField } from '@material-ui/core';

import { useStyles } from './coin-add-form.styles';

const ADD_BUTTON_LABEL = 'Add';
const coins = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
  },
];

const CoinAddForm: React.FC = observer(() => {
  const styles = useStyles();
  const { addCoinToPortfolio, isAdding } = useContext(CoinStore);
  const [coin, setCoin] = useState(coins[0].id);
  const [amount, setAmount] = useState('');

  const onAmountChange = ({ target }): void => {
    const value = Number(target.value);
    if (value >= 0) {
      setAmount(target.value);
    }
  };

  const onAdd = async (): Promise<void> => {
    const _coin = coins.find(({ id }) => id === coin);

    if (_coin) {
      await addCoinToPortfolio({
        ..._coin,
        amount: Number(amount),
      });
      setAmount('');
    }
  };

  return (
    <Grid
      container={true}
      spacing={2}
      className={styles.container}
      justifyContent={'center'}
    >
      <Grid item={true} xs={4}>
        <TextField
          id={'outlined-select-currency-native'}
          select={true}
          label={'Token Symbol'}
          SelectProps={{
            native: true,
          }}
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          variant={'outlined'}
          size={'small'}
          className={styles.field}
          disabled={isAdding}
        >
          {coins.map((option) => (
            <option key={option.id} value={option.id}>
              {option.symbol}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item={true} xs={4}>
        <TextField
          id={'name-size-normal'}
          label={'Amount'}
          variant={'outlined'}
          size={'small'}
          value={amount}
          className={styles.field}
          onChange={onAmountChange}
          disabled={isAdding}
        />
      </Grid>
      <Grid item={true} xs={2}>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={onAdd}
          disabled={isAdding}
        >
          {ADD_BUTTON_LABEL}
        </Button>
      </Grid>
    </Grid>
  );
});

export default CoinAddForm;
