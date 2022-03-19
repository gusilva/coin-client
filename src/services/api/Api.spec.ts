import axios from "axios";
import {setupServer} from "msw/node";
import { handlers } from "./Api.mocks";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Should retrieve all portfolio coins', async () => {
  const { data } = await axios.get<{ id: string; symbol: string }[]>('http://localhost:3000/coins');

  expect(data[0].id).toBe('ethereum');
  expect(data[1].id).toBe('bitcoin');
});
