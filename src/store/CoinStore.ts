import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { computedFn } from 'mobx-utils';
import { messageStore, MessageType } from './MessageStore';
import { Coin } from '@/services/api/api.types';
import api from '@/services/api/api';
import {
  CoinCurrencyData,
  PriceCurrencyData,
} from '@/services/crypto-currency/crypto-currency.types';
import { formatMoney } from '@/utils/money';
import cryptoCurrency from '@/services/crypto-currency/crypto-currency';

export type CoinCurrency = Omit<CoinCurrencyData, 'name'>;
type CoinCurrencies = CoinCurrency[];

const COIN_BATCH = 500;

class CoinStore {
  portfolioCoins: Coin[] = [];
  allCoins: CoinCurrencies = [];
  availableCoins: CoinCurrencies = [];
  coinsPrices: Map<string, number> = new Map<string, number>();
  isFetching: boolean = false;
  isUpdating: boolean = false;
  isDeleting: boolean = false;
  isAdding: boolean = false;

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

  fetchPortfolioCoins = async () => {
    try {
      const coins = await api.getPortfolioCoins();
      this.setCoins(coins);
    } catch (e) {
      console.log(e);
    }
  };

  addCoinToPortfolio = async (coin: Coin) => {
    this.setIsAdding(true);
    try {
      await api.addCoinAmount(coin);
      await this.fetchPortfolioCoins();

      messageStore.addMessage('Coin has been added', MessageType.SUCCESS);
    } catch (e) {
      messageStore.addMessage('Adding coin failed', MessageType.ERROR);
    } finally {
      this.setIsAdding(false);
    }
  };

  updatePortfolioCoinById = async (id: string, amount: number) => {
    this.setIsUpdating(true);
    try {
      await api.updateCoinAmount(id, { amount });
      await this.fetchPortfolioCoins();
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsUpdating(false);
    }
  };

  deletePortfolioCoinById = async (id: string) => {
    this.setIsDeleting(true);
    try {
      await api.deleteCoin(id);
      await this.fetchPortfolioCoins();
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsDeleting(false);
    }
  };

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
  };

  setCoins = (coins: Coin[]) => {
    this.portfolioCoins = coins;
  };

  setIsUpdating = (isUpdating: boolean) => {
    this.isUpdating = isUpdating;
  };

  setIsDeleting = (isDeleting: boolean) => {
    this.isDeleting = isDeleting;
  };

  setIsAdding = (isAdding: boolean) => {
    this.isAdding = isAdding;
  };

  setCryptoCoins = (coins: CoinCurrencies) => {
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

export default createContext(new CoinStore());
