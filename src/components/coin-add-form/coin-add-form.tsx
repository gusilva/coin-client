import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import { useStyles } from './coin-add-form.styles';

const ADD_BUTTON_LABEL = 'Add';
const coins = [
  {
    value: 'bitcoin',
    label: 'BTC',
  },
  {
    value: 'ethereum',
    label: 'ETH',
  },
];

const CoinAddForm: React.FC = () => {
  const styles = useStyles();

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
          variant={'outlined'}
          size={'small'}
          className={styles.field}
        >
          {coins.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
          className={styles.field}
        />
      </Grid>
      <Grid item={true} xs={2}>
        <Button variant={'contained'} color={'primary'}>
          {ADD_BUTTON_LABEL}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CoinAddForm;
