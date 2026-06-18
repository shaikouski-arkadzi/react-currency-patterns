import { CurrencyFacade } from "./service/currency/facade";
import "./style.css";

const requestButton = document.querySelector("#request");

requestButton?.addEventListener("click", async () => {
  const currRates = await CurrencyFacade.getLatestRates();
  console.log("Курсы JPY и CAD:", currRates);
});
