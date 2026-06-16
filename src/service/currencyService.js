const apiKey = import.meta.env.VITE_API_KEY?.trim();

console.log(apiKey);

export function currencyService() {
	fetch(
		`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=PKR,GBP,EUR,USD`,
	)
		.then((d) => d.json())
		.then((d) => console.log(d));
}
