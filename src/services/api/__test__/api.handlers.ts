import { rest } from 'msw';
import { addCoinResponse, allCoinsResponse } from './api.mocks';
import { CRYPTO_COIN_URL, CRYPTO_COIN_ENDPOINT } from '../api.constants';
import { AddCoinPayload, CoinsResponse } from '../api.types';

export const handlers = [
  rest.get<CoinsResponse>(
    `${CRYPTO_COIN_URL}${CRYPTO_COIN_ENDPOINT}`,
    (req, res, ctx) => res(ctx.json(allCoinsResponse)),
  ),
  rest.post<AddCoinPayload>(
    `${CRYPTO_COIN_URL}${CRYPTO_COIN_ENDPOINT}`,
    (req, res, ctx) => {
      const { id, amount } = req.body;

      if (id === 'bitcoin' && amount === 4) {
        addCoinResponse.amount = 14;
      }

      return res(ctx.json(addCoinResponse));
    },
  ),
];
