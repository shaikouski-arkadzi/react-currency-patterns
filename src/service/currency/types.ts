export interface CurrencyResponse {
  base: string;
  date: Date;
  rates: Record<string, string>;
}
