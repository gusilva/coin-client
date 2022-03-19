import React from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Coin } from '@/services/api/api.types';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useModal } from '@/hooks/useModal';
import CoinForm from '@/components/coin-form';

type CoinItemProps = {
  coin: Coin;
};

const CoinItem: React.FC<CoinItemProps> = ({ coin }) => {
  const { show, hide, RenderModal } = useModal();

  const { symbol, amount } = coin;

  const onDelete = (): void => console.log('deleted');

  return (
    <TableRow>
      <TableCell component={'th'} scope={'row'}>
        {symbol.toUpperCase()}
      </TableCell>
      <TableCell align={'right'}>{amount}</TableCell>
      <TableCell align={'right'}>{'--'}</TableCell>
      <TableCell align={'right'}>
        <IconButton onClick={show} edge={'end'} aria-label={'update'}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell align={'center'}>
        <IconButton onClick={onDelete} edge={'end'} aria-label={'delete'}>
          <HighlightOffIcon />
        </IconButton>
      </TableCell>
      <RenderModal>
        <CoinForm title={symbol} initialAmount={amount} onCancel={hide} />
      </RenderModal>
    </TableRow>
  );
};

export default CoinItem;
