import { formatNumberPrecision } from '../number';

it('should format number to max 8 decimal places', () => {
  expect(formatNumberPrecision(10.999999999)).toBe('10.99999999');
  expect(formatNumberPrecision(10.1)).toBe('10.1');
});
