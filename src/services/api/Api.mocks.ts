import {rest} from 'msw';

const API_URL = 'http://localhost:3000';

const handlers = [
  rest.get<{ id: string; symbol: string }[]>(`${API_URL}/coins`, (req, res, ctx) =>
      res(ctx.json(allCoinsResponse)),
  ),
];

const allCoinsResponse = [
  {
    "id": "ethereum",
    "symbol": "eth",
    "amount": 2
  },
  {
    "id": "bitcoin",
    "symbol": "btc",
    "amount": 2
  }
]

export { handlers, rest };
