import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: theme.spacing(1),
  },
  field: {
    width: '100%',
  },
  menu: {
    maxHeight: 300,
  },
}));
