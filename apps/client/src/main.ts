import { CurrencyFacade } from "./service/currency/facade";
import { createCurrencyProxy } from "./service/currency/cache";
import "./style.css";

const requestButton = document.querySelector("#request");

const ProxiedCurrencyApi = createCurrencyProxy(CurrencyFacade);

requestButton?.addEventListener("click", async () => {
  const currRates = await ProxiedCurrencyApi.getLatestRates();
  console.log("Курсы JPY и CAD:", currRates);
});
