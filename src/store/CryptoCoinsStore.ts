import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { CoinCurrencyData } from '@/services/crypto-currency/crypto-currency.types';
import cryptoCurrency from '@/services/crypto-currency/crypto-currency';

type CryptoCoin = Omit<CoinCurrencyData, 'name'>;
type CryptoCoins = CryptoCoin[];

class CryptoCoinsStore {
  cryptoCoins: CryptoCoins = [];
  isFetching: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

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

  setCryptoCoins = (coins: CryptoCoins) => {
    this.cryptoCoins = coins;
  };

  setIsFetching = (isFetching: boolean) => {
    this.isFetching = isFetching;
  };
}

export default createContext(new CryptoCoinsStore());
