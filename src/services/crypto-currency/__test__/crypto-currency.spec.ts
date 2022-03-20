import { mockedCoinGeckoListCoins } from './crypto-currency.mocks';
import cryptoCurrency from '../crypto-currency';

jest.mock('coingecko-api', () =>
  jest.fn().mockImplementation(() => ({
    coins: {
      list: mockedCoinGeckoListCoins,
    },
  })),
);

it('should retrieve all coins available', async () => {
  const coins = await cryptoCurrency.getCryptoCoins();

  expect(coins.length).toBe(3);
  expect(coins[0].id).toBe('01coin');
  expect(coins[0].symbol).toBe('zoc');
});
