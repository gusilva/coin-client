export type Coin = {
  id: string;
  symbol: string;
  amount: number;
};
export type CoinsResponse = Coin[];
export type AddCoinPayload = Omit<Coin, 'symbol'>;
export type AddCoinResponse = Coin;
