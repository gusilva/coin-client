export const formatMoney = (value: number): string =>
  `$${Math.abs(value)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
