export const formatNumberPrecision = (value: number): string =>
  value.toString().match(/\d*\.?\d{0,8}/)?.[0];
