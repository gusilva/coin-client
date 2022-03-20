import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { computedFn } from 'mobx-utils';
import {
  CoinCurrencyData,
  PriceCurrencyData,
} from '@/services/crypto-currency/crypto-currency.types';
import cryptoCurrency from '@/services/crypto-currency/crypto-currency';
import { formatMoney } from '@/utils/money';

export type CryptoCoin = Omit<CoinCurrencyData, 'name'>;
type CryptoCoins = CryptoCoin[];

class CryptoCoinsStore {
  cryptoCoins: CryptoCoins = [];
  cryptoCoinsPrices: Map<string, number> = new Map<string, number>();
  isFetching: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getCoinPrice = computedFn((coinId: string, amount: number) => {
    const price = this.cryptoCoinsPrices.get(coinId);
    if (price) {
      return formatMoney(amount * price);
    } else {
      return `no data`;
    }
  });

  fetchCryptoCoins = async () => {
    try {
      this.setIsFetching(true);
      const coins = await cryptoCurrency.getCryptoCoins();
      this.setCryptoCoins(coins);
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsFetching(false);
    }
  };

  fetchCryptoCoinsPrice = async (coinsIds: string[]) => {
    try {
      const prices = await cryptoCurrency.getCryptoCoinsUsdPrice(coinsIds);
      this.setCryptoCoinsPrice(prices);
    } catch (e) {
      console.log(e);
    }
  };

  setCryptoCoins = (coins: CryptoCoins) => {
    this.cryptoCoins = coins;
  };

  setIsFetching = (isFetching: boolean) => {
    this.isFetching = isFetching;
  };

  setCryptoCoinsPrice = (coinsPrice: PriceCurrencyData) => {
    for (const [id, price] of Object.entries(coinsPrice)) {
      this.cryptoCoinsPrices.set(id, price.usd);
    }
  };
}

export default createContext(new CryptoCoinsStore());
