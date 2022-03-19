import { rest } from 'msw';
import { CoinsResponse } from '@/services/api/api.types';

const API_URL = 'http://localhost:3000';

const handlers = [
  rest.get<CoinsResponse>(`${API_URL}/coins`, (req, res, ctx) =>
    res(ctx.json(allCoinsResponse)),
  ),
];

const allCoinsResponse = [
  {
    id: 'ethereum',
    symbol: 'eth',
    amount: 2,
  },
  {
    id: 'bitcoin',
    symbol: 'btc',
    amount: 10,
  },
];

export { handlers, rest };
