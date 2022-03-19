import { setupServer } from 'msw/node';
import { handlers } from './api.handlers';
import api from '../api';
import axios from 'axios';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Should retrieve all portfolio coins', async () => {
  const coins = await api.getPortfolioCoins();

  expect(coins[0].id).toBe('ethereum');
  expect(coins[0].symbol).toBe('eth');
  expect(coins[0].amount).toBe(2);
  expect(coins[1].id).toBe('bitcoin');
  expect(coins[1].symbol).toBe('btc');
  expect(coins[1].amount).toBe(10);
});

it('Should add a coin amount in the portfolio', async () => {
  const coins = await axios.post('http://localhost:3000/coins', {
    id: 'BTC',
    amount: 2,
  });

  expect(coins.data.id).toBe('bitcoin');
  expect(coins.data.symbol).toBe('btc');
  expect(coins.data.amount).toBe(12);
});
