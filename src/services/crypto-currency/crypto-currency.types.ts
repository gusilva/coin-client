type ReturnObject<T> = {
  success: boolean;
  message: string;
  code: number;
  data?: T[];
};

export type CoinCurrencyData = {
  id: string;
  symbol: string;
  name: string;
};

export type CryptoCurrencyCoins = {
  list: () => Promise<ReturnObject<CoinCurrencyData>>;
};
