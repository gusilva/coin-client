const mockedListCoinsData = [
  { id: '01coin', symbol: 'zoc', name: '01coin' },
  {
    id: '0-5x-long-algorand-token',
    symbol: 'algohalf',
    name: '0.5X Long Algorand Token',
  },
  {
    id: '0-5x-long-altcoin-index-token',
    symbol: 'althalf',
    name: '0.5X Long Altcoin Index Token',
  },
];

const mockedSimplePriceData = {
  bitcoin: { usd: 41559 },
  ethereum: { usd: 2876.16 },
};

export const mockedCoinGeckoListCoins = (): object => ({
  success: true,
  message: 'OK',
  code: 200,
  data: mockedListCoinsData,
});

export const mockedCoinGeckoSimplePrice = (): object => ({
  success: true,
  message: 'OK',
  code: 200,
  data: mockedSimplePriceData,
});
