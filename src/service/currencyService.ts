const API_KEY = import.meta.env.VITE_API_KEY?.trim();

const BASE_URL = "https://api.currencyfreaks.com/v2.0";

interface ErrorResponse {
  message?: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
    try {
      const errorData: ErrorResponse = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (error) {}
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
};

// export function currencyService() {
//   fetch(`/rates/latest?apikey=${apiKey}&symbols=PKR,GBP,EUR,USD`)
//     .then((d) => d.json())
//     .then((d) => console.log(d));
// }
