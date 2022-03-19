import { setupServer } from 'msw/node';
import { handlers } from './api.handlers';
import api from '../api';

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

it('Should add two BTC to the portfolio and return the total amount', async () => {
  const coin = await api.addCoinAmount({
    id: 'bitcoin',
    symbol: 'BTC',
    amount: 2,
  });

  expect(coin.id).toBe('bitcoin');
  expect(coin.symbol).toBe('btc');
  expect(coin.amount).toBe(12);
});

it('Should add four BTC to the portfolio and return the total amount', async () => {
  const coin = await api.addCoinAmount({
    id: 'bitcoin',
    symbol: 'BTC',
    amount: 4,
  });

  expect(coin.id).toBe('bitcoin');
  expect(coin.symbol).toBe('btc');
  expect(coin.amount).toBe(14);
});
