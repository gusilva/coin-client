import React, { useState } from 'react';
import { Button, DialogTitle, TextField } from '@material-ui/core';

import { useStyles } from './coin-form.styles';

type CoinFormProps = {
  title: string;
  initialAmount: number;
  onSave?: () => void;
  onCancel?: () => void;
};

const SAVE_BUTTON_LABEL = 'Save';
const CANCEL_BUTTON_LABEL = 'Cancel';

const CoinForm: React.FC<CoinFormProps> = ({
  title,
  initialAmount,
  onSave,
  onCancel,
}) => {
  const styles = useStyles();
  const [amount, setAmount] = useState(initialAmount);

  const onAmountChange = ({ target }): void => {
    const value = Number(target.value);
    if (value >= 0) {
      setAmount(target.value);
    }
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
      />
      <div className={styles.buttonGroup}>
        <Button
          className={styles.saveButton}
          variant={'contained'}
          color={'primary'}
          onClick={onSave}
        >
          {SAVE_BUTTON_LABEL}
        </Button>
        <Button
          className={styles.cancelButton}
          variant={'contained'}
          color={'default'}
          onClick={onCancel}
        >
          {CANCEL_BUTTON_LABEL}
        </Button>
      </div>
    </>
  );
};

export default CoinForm;
