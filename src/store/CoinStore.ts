import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { messageStore, MessageType } from './MessageStore';
import { Coin } from '@/services/api/api.types';
import api from '@/services/api/api';

class CoinStore {
  coins: Coin[] = [];
  isUpdating: boolean = false;
  isDeleting: boolean = false;
  isAdding: boolean = false;

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

  setCoins = (coins: Coin[]) => {
    this.coins = coins;
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
}

export default createContext(new CoinStore());
