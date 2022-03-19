import { setupServer } from 'msw/node';
import { handlers } from './Api.mocks';
import api from './api';

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
