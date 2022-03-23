import { CoinCurrencyData } from '@/services/crypto-currency/crypto-currency.types';

export type CoinCurrency = Omit<CoinCurrencyData, 'name'>;
export type CoinCurrencies = CoinCurrency[];
