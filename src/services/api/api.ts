import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CoinsResponse } from './api.types';
import {
  CRYPTO_COIN_URL,
  API_TIMEOUT,
  CRYPTO_COIN_ENDPOINT,
} from './api.constants';

class Api {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: CRYPTO_COIN_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Accept-Language': 'en,en-gb;q=0.5',
        'Accept-Charset': 'UTF-8;q=0.7,*;q=0.7',
        'Content-Type': 'application/json',
        Pragma: 'no-cache',
        'Cache-Control':
          'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0',
      },
    });

    this.axios.interceptors.response.use(this._responseInterceptor);
  }

  public getPortfolioCoins = async () =>
    await this.axios.get<CoinsResponse>(CRYPTO_COIN_ENDPOINT);

  private readonly _responseInterceptor = (response: AxiosResponse) =>
    response.data;
}

const api = new Api();

export default api;
