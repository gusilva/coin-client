import { AxiosInstance, AxiosRequestConfig } from 'axios';

export type Coin = {
  id: string;
  symbol: string;
  amount: number;
};
export type CoinsResponse = Coin[];
export type AddCoinPayload = Coin;
export type AddCoinResponse = Coin;

type AgentInstanceOriginal = Omit<
  AxiosInstance,
  'get' | 'delete' | 'post' | 'put'
>;

export interface AgentInstance extends AgentInstanceOriginal {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
}
