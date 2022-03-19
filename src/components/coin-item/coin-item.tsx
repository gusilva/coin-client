import React, { useState } from 'react';
import { IconButton, TableCell, TableRow, TextField } from '@material-ui/core';
import { Coin } from '@/services/api/api.types';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SaveIcon from '@material-ui/icons/Save';

type CoinItemProps = {
  coin: Coin;
};

const CoinItem: React.FC<CoinItemProps> = ({ coin }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { symbol, amount } = coin;

  const onDelete = (): void => console.log('deleted');
  const onEdit = (): void => setIsEditing(true);
  const onSave = (): void => {
    setIsEditing(false);
  };

  return (
    <TableRow>
      <TableCell component={'th'} scope={'row'}>
        {symbol.toUpperCase()}
      </TableCell>
      <TableCell align={'right'} style={{ width: 100 }}>
        {isEditing ? (
          <TextField
            id={'outlined-basic'}
            value={amount}
            variant={'outlined'}
            size={'small'}
          />
        ) : (
          amount
        )}
      </TableCell>
      <TableCell align={'right'}>{'--'}</TableCell>
      <TableCell align={'right'}>
        <IconButton
          onClick={isEditing ? onSave : onEdit}
          edge={'end'}
          aria-label={'update'}
        >
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </TableCell>
      <TableCell align={'center'}>
        <IconButton onClick={onDelete} edge={'end'} aria-label={'delete'}>
          <HighlightOffIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CoinItem;
