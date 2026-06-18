import type { CurrencyResponse } from "./types";

export const CurrencyAdapter = {
  formatRates: (rawData: CurrencyResponse) => {
    if (!rawData || !rawData.rates) return {};

    return Object.entries(rawData.rates).reduce((acc, [symbol, value]) => {
      acc[symbol] = parseFloat(value).toFixed(2);
      return acc;
    }, {});
  },
};
