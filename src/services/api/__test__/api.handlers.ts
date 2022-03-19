import { rest } from 'msw';
import { CoinsResponse } from '@/services/api/api.types';
import { allCoinsResponse } from './api.mocks';
import { CRYPTO_COIN_URL, CryptoCoinEndpoint } from '../api.constants';

export const handlers = [
  rest.get<CoinsResponse>(
    `${CRYPTO_COIN_URL}${CryptoCoinEndpoint.allCoins}`,
    (req, res, ctx) => res(ctx.json(allCoinsResponse)),
  ),
];
