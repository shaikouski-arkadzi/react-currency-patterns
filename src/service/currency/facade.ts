import { CurrencyAdapter } from "./adapter";
import { makeRequest } from "./currencyService";
import { type CurrencyResponse } from "./types";

export const CurrencyFacade = {
  getLatestRates: async (symbols = ["PKR", "GBP", "EUR", "USD"]) => {
    const symbolsString = symbols.join(",");
    const rawData = await makeRequest<CurrencyResponse>(
      "/rates/latest",
      "GET",
      {
        symbols: symbolsString,
      },
    );
    return CurrencyAdapter.formatRates(rawData);
  },
};
