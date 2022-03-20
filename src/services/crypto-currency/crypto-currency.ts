import CoinGecko from 'coingecko-api';
import { CryptoCurrencyCoins } from '@/services/crypto-currency/crypto-currency.types';

class CryptoCurrency {
  private readonly coins: CryptoCurrencyCoins;

  constructor() {
    const client = new CoinGecko();
    this.coins = client.coins;
  }

  public getCryptoCoins = async () => {
    const { data } = await this.coins.list();
    return data?.map(({ id, symbol }) => ({ id, symbol })) ?? [];
  };
}

const cryptoCurrency = new CryptoCurrency();
export default cryptoCurrency;
