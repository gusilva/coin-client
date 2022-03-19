import React from 'react';
import { Container } from '@material-ui/core';
import CoinsList from '@/components/coins-list/coins-list';

const App: React.FC = () => (
  <>
    <Container maxWidth={'lg'}>
      <CoinsList />
    </Container>
  </>
);

export default App;
