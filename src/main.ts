import { CurrencyFacade } from "./service/currency/currencyService";

import "./style.css";

const requestButton = document.querySelector("#request");

requestButton?.addEventListener("click", async () => {
  const currRates = await CurrencyFacade.getLatestRates();
  console.log("Курсы JPY и CAD:", currRates);
});
