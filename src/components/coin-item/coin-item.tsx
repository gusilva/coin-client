import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import CoinStore from '@/store/CoinStore';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Coin } from '@/services/api/api.types';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useModal } from '@/hooks/useModal';
import CoinForm from '@/components/coin-form';

type CoinItemProps = {
  coin: Coin;
};

const CoinItem: React.FC<CoinItemProps> = observer(({ coin }) => {
  const { updatePortfolioCoinById, deletePortfolioCoinById, isDeleting } =
    useContext(CoinStore);
  const { show, hide, RenderModal } = useModal();

  const { id, symbol, amount } = coin;

  const onDelete = async (): Promise<void> => {
    await deletePortfolioCoinById(id);
  };
  const onSave = async (amt: number): Promise<void> => {
    await updatePortfolioCoinById(id, amt);
    hide();
  };

  return (
    <TableRow>
      <TableCell component={'th'} scope={'row'}>
        {symbol.toUpperCase()}
      </TableCell>
      <TableCell align={'right'}>{amount}</TableCell>
      <TableCell align={'right'}>{'--'}</TableCell>
      <TableCell align={'right'}>
        <IconButton
          onClick={show}
          edge={'end'}
          aria-label={'update'}
          disabled={isDeleting}
          color={'primary'}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell align={'center'}>
        <IconButton
          onClick={onDelete}
          edge={'end'}
          aria-label={'delete'}
          disabled={isDeleting}
          color={'secondary'}
        >
          <HighlightOffIcon />
        </IconButton>
      </TableCell>
      <RenderModal>
        <CoinForm
          title={symbol}
          initialAmount={amount}
          onCancel={hide}
          onSave={onSave}
        />
      </RenderModal>
    </TableRow>
  );
});

export default CoinItem;
