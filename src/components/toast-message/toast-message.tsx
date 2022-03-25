import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import MessageStore, { MessageType } from '@/store/MessageStore';
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  useTheme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ToastMessage: React.FC = observer(() => {
  const theme = useTheme();
  const { hasMessage, message, removeMessage } = useContext(MessageStore);

  const { text = '', type } = message ?? {};

  const snackBackground = useMemo(() => {
    const bg = { background: theme.palette.background.paper };

    switch (type) {
      case MessageType.SUCCESS:
        bg.background = theme.palette.success.main;
        break;
      case MessageType.WARN:
        bg.background = theme.palette.warning.main;
        break;
      case MessageType.ERROR:
        bg.background = theme.palette.error.main;
        break;
      default:
        break;
    }

    return bg;
  }, [type]);

  const SnackbarMessage = (
    <SnackbarContent
      aria-describedby={'message-id2'}
      style={snackBackground}
      message={
        <span>
          <div>{text}</div>
        </span>
      }
      action={
        <IconButton
          size={'small'}
          aria-label={'close'}
          color={'inherit'}
          onClick={removeMessage}
        >
          <CloseIcon fontSize={'small'} />
        </IconButton>
      }
    />
  );

  const EmptySnackMessage = (
    <SnackbarContent
      aria-describedby={'message-id2'}
      style={snackBackground}
      message={''}
    />
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={hasMessage}
      onClose={removeMessage}
      autoHideDuration={5000}
    >
      {hasMessage ? SnackbarMessage : EmptySnackMessage}
    </Snackbar>
  );
});

export default ToastMessage;
