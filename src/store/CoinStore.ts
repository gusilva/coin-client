import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { Coin } from '@/services/api/api.types';
import api from '@/services/api/api';

class CoinStore {
  coins: Coin[] = [];
  isUpdating: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchPortfolioCoins = async () => {
    try {
      const coins = await api.getPortfolioCoins();
      this.setCoins(coins);
    } catch (e) {
      console.log(e);
    }
  };

  updatePortfolioCoinById = async (id: string, amount: number) => {
    this.setIsUpdating(true);
    try {
      await api.updateCoinAmount(id, { amount });
    } catch (e) {
      console.log(e);
    } finally {
      this.setIsUpdating(false);
    }
  };

  setCoins = (coins: Coin[]) => {
    this.coins = coins;
  };

  setIsUpdating = (isUpdating: boolean) => {
    this.isUpdating = isUpdating;
  };
}

export default createContext(new CoinStore());
