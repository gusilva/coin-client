type ReturnObject<T> = {
  success: boolean;
  message: string;
  code: number;
  data?: T;
};

export type CoinCurrencyData = {
  id: string;
  symbol: string;
  name: string;
};

export type PriceCurrencyData = {
  [id: string]: {
    usd: number;
  };
};

export type CryptoCurrencyCoins = {
  list: () => Promise<ReturnObject<CoinCurrencyData[]>>;
};

export type CryptoCurrencyPricePayload = {
  ids: string[];
  vs_currencies: string[];
};

export type CryptoCurrencyPrice = {
  price: (
    params: CryptoCurrencyPricePayload,
  ) => Promise<ReturnObject<PriceCurrencyData>>;
};
