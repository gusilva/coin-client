import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { computedFn } from 'mobx-utils';
import {
  CoinCurrencyData,
  PriceCurrencyData,
} from '@/services/crypto-currency/crypto-currency.types';
import cryptoCurrency from '@/services/crypto-currency/crypto-currency';
import { formatMoney } from '@/utils/money';
import { messageStore, MessageType } from '@/store/MessageStore';

export type CryptoCoin = Omit<CoinCurrencyData, 'name'>;
type CryptoCoins = CryptoCoin[];

const COIN_BATCH = 500;

class CryptoCoinsStore {
  allCoins: CryptoCoins = [];
  availableCoins: CryptoCoins = [];
  coinsPrices: Map<string, number> = new Map<string, number>();
  isFetching: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getCoinPrice = computedFn((coinId: string, amount: number) => {
    const price = this.coinsPrices.get(coinId);
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
    } catch {
      messageStore.addMessage('Error fetching coins', MessageType.ERROR);
    } finally {
      this.setIsFetching(false);
    }
  };

  fetchCryptoCoinsPrice = async (coinsIds: string[]) => {
    try {
      const prices = await cryptoCurrency.getCryptoCoinsUsdPrice(coinsIds);
      this.setCryptoCoinsPrice(prices);
    } catch (e) {
      messageStore.addMessage('Error fetching coins prices', MessageType.ERROR);
    }
  };

  loadCoins = () => {
    if (this.availableCoins.length !== this.allCoins.length) {
      this.availableCoins = this.allCoins.slice(
        0,
        this.availableCoins.length + COIN_BATCH,
      );
    }
    console.log(this.availableCoins.length, this.allCoins.length);
  };

  setCryptoCoins = (coins: CryptoCoins) => {
    this.allCoins = coins;
    this.availableCoins = coins.slice(0, COIN_BATCH);
  };

  setIsFetching = (isFetching: boolean) => {
    this.isFetching = isFetching;
  };

  setCryptoCoinsPrice = (coinsPrice: PriceCurrencyData) => {
    for (const [id, price] of Object.entries(coinsPrice)) {
      this.coinsPrices.set(id, price.usd);
    }
  };
}

export default createContext(new CryptoCoinsStore());
