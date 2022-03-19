import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { Coin } from '@/services/api/api.types';
import api from '@/services/api/api';

class CoinStore {
  coins: Coin[] = [];

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

  setCoins = (coins: Coin[]) => {
    this.coins = coins;
  };
}

export default createContext(new CoinStore());
