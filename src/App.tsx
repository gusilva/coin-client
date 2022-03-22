import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import CoinsList from '@/components/coins-list';
import ToastMessage from '@/components/toast-message';

const App: React.FC = () => (
  <>
    <AppBar position={'absolute'}>
      <Toolbar>
        <Typography variant={'h6'} noWrap={true}>
          {'Crypto App'}
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth={'lg'}>
      <CoinsList />
    </Container>
    <ToastMessage />
  </>
);

export default App;
