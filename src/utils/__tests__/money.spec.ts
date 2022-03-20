import { formatMoney } from '../money';

it('should format float number', () => {
  expect(formatMoney(10.99)).toBe('$10.99');
  expect(formatMoney(11.9901)).toBe('$11.99');
});
