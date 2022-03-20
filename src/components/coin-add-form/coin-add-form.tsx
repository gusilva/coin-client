import React, { useCallback, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CoinStore from '@/store/CoinStore';
import CryptoCoinsStore, { CryptoCoin } from '@/store/CryptoCoinsStore';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import { useStyles } from './coin-add-form.styles';

const ADD_BUTTON_LABEL = 'Add';
const TOKEN_SYMBOL_LABEL = 'Token Symbol';
const AMOUNT_LABEL = 'Amount';

const CoinAddForm: React.FC = observer(() => {
  const { isAdding, addCoinToPortfolio } = useContext(CoinStore);
  const { cryptoCoins, isFetching, fetchCryptoCoins } =
    useContext(CryptoCoinsStore);

  const styles = useStyles();

  const [coinIndex, setCoinIndex] = useState(0);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchCryptoCoins();
  }, [fetchCryptoCoins]);

  const onSelectCoinChange = ({
    target,
  }: React.ChangeEvent<{ value: number }>): void => {
    setCoinIndex(target.value);
  };

  const onAmountChange = ({ target }): void => {
    const value = Number(target.value);
    if (value >= 0) {
      setAmount(target.value);
    }
  };

  const onAddCoin = async (): Promise<void> => {
    await addCoinToPortfolio({
      ...cryptoCoins[coinIndex],
      amount: Number(amount),
    });
    setAmount('');
  };

  const renderCoinMenuItem = useCallback(
    ({ id, symbol }: CryptoCoin, index: number): React.ReactNode => (
      <MenuItem key={`${id}-${index}`} value={index}>
        {symbol.toUpperCase()}
      </MenuItem>
    ),
    [],
  );

  return (
    <Grid
      container={true}
      spacing={2}
      className={styles.container}
      justifyContent={'center'}
    >
      <Grid item={true} xs={4} md={2}>
        <FormControl
          size={'small'}
          variant={'outlined'}
          className={styles.field}
        >
          <InputLabel>{TOKEN_SYMBOL_LABEL}</InputLabel>
          {!!cryptoCoins.length && (
            <Select
              value={coinIndex}
              onChange={onSelectCoinChange}
              label={TOKEN_SYMBOL_LABEL}
              disabled={isAdding}
            >
              {cryptoCoins.map(renderCoinMenuItem)}
            </Select>
          )}
        </FormControl>
      </Grid>
      <Grid item={true} xs={4} md={8}>
        <TextField
          variant={'outlined'}
          size={'small'}
          label={AMOUNT_LABEL}
          value={amount}
          className={styles.field}
          onChange={onAmountChange}
          disabled={isAdding || isFetching}
          placeholder={AMOUNT_LABEL}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item={true} xs={2} md={2}>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={onAddCoin}
          disabled={isAdding}
          className={styles.field}
        >
          {ADD_BUTTON_LABEL}
        </Button>
      </Grid>
    </Grid>
  );
});

export default CoinAddForm;
