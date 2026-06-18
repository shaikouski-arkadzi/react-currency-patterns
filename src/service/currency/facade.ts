import { makeRequest } from "./currencyService";
import { type CurrencyResponse } from "./types";

export const CurrencyFacade = {
  getLatestRates: async (symbols = ["PKR", "GBP", "EUR", "USD"]) => {
    const symbolsString = symbols.join(",");
    return makeRequest<CurrencyResponse>("/rates/latest", "GET", {
      symbols: symbolsString,
    });
  },
};
