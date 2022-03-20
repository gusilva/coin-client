import {
  mockedCoinGeckoListCoins,
  mockedCoinGeckoSimplePrice,
} from './crypto-currency.mocks';
import cryptoCurrency from '../crypto-currency';

jest.mock('coingecko-api', () =>
  jest.fn().mockImplementation(() => ({
    coins: {
      list: mockedCoinGeckoListCoins,
    },
    simple: {
      price: mockedCoinGeckoSimplePrice,
    },
  })),
);

describe('Coin Gecko API tests', () => {
  it('should retrieve all coins available', async () => {
    const coins = await cryptoCurrency.getCryptoCoins();

    expect(coins.length).toBe(3);
    expect(coins[0].id).toBe('01coin');
    expect(coins[0].symbol).toBe('zoc');
  });

  it('should retrieve the coins price', async () => {
    const coinsPrices = await cryptoCurrency.getCryptoCoinsUsdPrice([
      'bitcoin',
      'ethereum',
    ]);

    expect(coinsPrices.bitcoin.usd).toBe(41559);
    expect(coinsPrices.ethereum.usd).toBe(2876.16);
  });
});
