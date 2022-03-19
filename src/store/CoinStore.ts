import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { Coin } from '@/services/api/api.types';
import api from '@/services/api/api';

class CoinStore {
  coins: Coin[] = [];
  isUpdating: boolean = false;
  isDeleting: boolean = false;

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

  setCoins = (coins: Coin[]) => {
    this.coins = coins;
  };

  setIsUpdating = (isUpdating: boolean) => {
    this.isUpdating = isUpdating;
  };

  setIsDeleting = (isDeleting: boolean) => {
    this.isDeleting = isDeleting;
  };
}

export default createContext(new CoinStore());
