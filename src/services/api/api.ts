import axios, { AxiosResponse } from 'axios';
import {
  AddCoinPayload,
  AddCoinResponse,
  AgentInstance,
  CoinsResponse,
  UpdateCoinPayload,
  UpdateCoinResponse,
} from './api.types';
import {
  CRYPTO_COIN_URL,
  API_TIMEOUT,
  CRYPTO_COIN_ENDPOINT,
} from './api.constants';

class Api {
  private readonly axios: AgentInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: CRYPTO_COIN_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
      },
    });

    this.axios.interceptors.response.use(this._responseInterceptor);
  }

  public getPortfolioCoins = async () =>
    await this.axios.get<CoinsResponse>(CRYPTO_COIN_ENDPOINT);

  public addCoinAmount = async (payload: AddCoinPayload) =>
    await this.axios.post<AddCoinResponse>(CRYPTO_COIN_ENDPOINT, payload);

  public updateCoinAmount = async (id: string, payload: UpdateCoinPayload) =>
    await this.axios.put<UpdateCoinResponse>(
      `${CRYPTO_COIN_ENDPOINT}/${id}`,
      payload,
    );

  public deleteCoin = async (id: string) =>
    await this.axios.delete(`${CRYPTO_COIN_ENDPOINT}/${id}`);

  private readonly _responseInterceptor = (response: AxiosResponse) =>
    response.data;
}

const api = new Api();

export default api;
