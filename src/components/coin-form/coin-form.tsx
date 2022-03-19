import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CoinStore from '@/store/CoinStore';
import { Button, DialogTitle, TextField } from '@material-ui/core';

import { useStyles } from './coin-form.styles';

type CoinFormProps = {
  title: string;
  initialAmount: number;
  onSave?: (amount: number) => Promise<void>;
  onCancel?: () => void;
};

const SAVE_BUTTON_LABEL = 'Save';
const CANCEL_BUTTON_LABEL = 'Cancel';

const CoinForm: React.FC<CoinFormProps> = observer(
  ({ title, initialAmount, onSave, onCancel }) => {
    const { fetchPortfolioCoins, isUpdating } = useContext(CoinStore);
    const styles = useStyles();
    const [amount, setAmount] = useState(initialAmount);

    const onAmountChange = ({ target }): void => {
      const value = Number(target.value);
      if (value >= 0) {
        setAmount(target.value);
      }
    };

    const onSaveAmount = (): void => {
      onSave?.(amount).then(fetchPortfolioCoins);
    };

    return (
      <>
        <DialogTitle style={{ textAlign: 'center' }}>
          {title.toUpperCase()}
        </DialogTitle>
        <TextField
          id={'outlined-basic'}
          label={'Amount'}
          value={amount}
          onChange={onAmountChange}
          variant={'outlined'}
          size={'small'}
          disabled={isUpdating}
        />
        <div className={styles.buttonGroup}>
          <Button
            className={styles.saveButton}
            variant={'contained'}
            color={'primary'}
            onClick={onSaveAmount}
            disabled={isUpdating}
          >
            {SAVE_BUTTON_LABEL}
          </Button>
          <Button
            className={styles.cancelButton}
            variant={'contained'}
            color={'default'}
            onClick={onCancel}
            disabled={isUpdating}
          >
            {CANCEL_BUTTON_LABEL}
          </Button>
        </div>
      </>
    );
  },
);

export default CoinForm;
