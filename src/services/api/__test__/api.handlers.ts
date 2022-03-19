import { rest } from 'msw';
import {
  addCoinResponse,
  allCoinsResponse,
  updateCoinResponse,
} from './api.mocks';
import { CRYPTO_COIN_URL, CRYPTO_COIN_ENDPOINT } from '../api.constants';
import { AddCoinPayload, CoinsResponse, UpdateCoinPayload } from '../api.types';

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
  rest.put<UpdateCoinPayload>(
    `${CRYPTO_COIN_URL}${CRYPTO_COIN_ENDPOINT}/ethereum`,
    (req, res, ctx) => {
      const { amount } = req.body;

      if (amount === 20) {
        updateCoinResponse.amount = 20;
      }

      return res(ctx.json(updateCoinResponse));
    },
  ),
  rest.delete(
    `${CRYPTO_COIN_URL}${CRYPTO_COIN_ENDPOINT}/ethereum`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.set('Content-Type', 'application/json')),
  ),
];
