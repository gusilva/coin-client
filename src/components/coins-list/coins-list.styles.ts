import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 80,
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
}));
