import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  saveButton: {
    flex: 1,
    marginBottom: theme.spacing(1),
  },
  cancelButton: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
}));
