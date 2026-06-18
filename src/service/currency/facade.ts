import { makeRequest } from "./currencyService";

export const CurrencyFacade = {
  getLatestRates: async (symbols = ["PKR", "GBP", "EUR", "USD"]) => {
    const symbolsString = symbols.join(",");
    return makeRequest("/rates/latest", "GET", { symbols: symbolsString });
  },
};
