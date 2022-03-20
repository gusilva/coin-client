import CoinGecko from 'coingecko-api';
import {
  CryptoCurrencyCoins,
  CryptoCurrencyPrice,
} from '@/services/crypto-currency/crypto-currency.types';

class CryptoCurrency {
  private readonly coins: CryptoCurrencyCoins;
  private readonly simple: CryptoCurrencyPrice;

  constructor() {
    const client = new CoinGecko();
    this.coins = client.coins;
    this.simple = client.simple;
  }

  public getCryptoCoins = async () => {
    const { data } = await this.coins.list();
    return data?.map(({ id, symbol }) => ({ id, symbol })) ?? [];
  };

  public getCryptoCoinsUsdPrice = async (coinIds: string[]) => {
    const { data } = await this.simple.price({
      ids: coinIds,
      vs_currencies: ['usd'],
    });

    return data;
  };
}

const cryptoCurrency = new CryptoCurrency();
export default cryptoCurrency;
