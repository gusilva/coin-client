import { rest } from 'msw';
import { CoinsResponse } from '@/services/api/api.types';
import { allCoinsResponse } from './api.mocks';
import { CryptoCoinAPI } from '../api.endpoints';

const API_URL = 'http://localhost:3000';

export const handlers = [
  rest.get<CoinsResponse>(
    `${API_URL}${CryptoCoinAPI.allCoins}`,
    (req, res, ctx) => res(ctx.json(allCoinsResponse)),
  ),
];
