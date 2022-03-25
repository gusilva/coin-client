import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CoinStore from '@/store/CoinStore';
import { CoinCurrency } from '@/types/coin.types';
import { Button, FormControl, Grid, TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';

import { useStyles } from './coin-add-form.styles';

const ADD_BUTTON_LABEL = 'Add';
const TOKEN_SYMBOL_LABEL = 'Token Symbol';
const AMOUNT_LABEL = 'Amount';

const CoinAddForm: React.FC = observer(() => {
  const {
    isAdding,
    allCoins,
    isFetching,
    addCoinToPortfolio,
    fetchCoinCurrencies,
  } = useContext(CoinStore);

  const styles = useStyles();

  const [selectedCoin, setSelectedCoin] = useState<CoinCurrency>();
  const [amount, setAmount] = useState('');
  const isAddButtonDisabled = !Number(amount) || isAdding;

  const coinFilterOptions = createFilterOptions<CoinCurrency>({
    matchFrom: 'start',
    stringify: (option) => option.symbol,
  });

  const onAmountChange = ({ target }: React.ChangeEvent<{ value }>): void => {
    const value = Number(target.value);
    if (value >= 0) {
      setAmount(target.value);
    }
  };

  const onAddCoin = async (): Promise<void> => {
    await addCoinToPortfolio({
      ...selectedCoin,
      amount: Number(amount),
    });
    setAmount('');
  };

  const onSelectCoinChange = (
    event: any,
    newCoin: CoinCurrency | null,
  ): void => {
    setSelectedCoin({ ...newCoin });
  };

  useEffect(() => {
    fetchCoinCurrencies();
  }, [fetchCoinCurrencies]);

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
          {!!allCoins.length && (
            <Autocomplete<CoinCurrency>
              options={allCoins}
              defaultValue={allCoins[0]}
              onChange={onSelectCoinChange}
              filterOptions={coinFilterOptions}
              disabled={isAdding}
              getOptionLabel={({ symbol }) => symbol.toUpperCase()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={TOKEN_SYMBOL_LABEL}
                  variant={'outlined'}
                  size={'small'}
                  className={styles.field}
                />
              )}
            />
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
          disabled={isAddButtonDisabled}
          className={styles.field}
        >
          {ADD_BUTTON_LABEL}
        </Button>
      </Grid>
    </Grid>
  );
});

export default CoinAddForm;
