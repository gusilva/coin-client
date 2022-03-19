export interface Coin {
  id: string;
  symbol: string;
  amount: number;
}

export type CoinsResponse = Coin[];
