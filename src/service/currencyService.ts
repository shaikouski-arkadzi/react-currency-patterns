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

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

const makeRequest = async <T>(
  endpoint: string,
  method: HttpMethod = "GET",
  queryParams: QueryParams = {},
  body: Object = null,
  contentType: string = "application/json",
): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  const options: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
    },
  };

  if (body) {
    options.headers["Content-Type"] = contentType;
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url.toString(), options);
    return await handleResponse(response);
  } catch (error) {
    console.error(`[API ERROR] ${method} ${endpoint}: ${error.message}`);
    throw error;
  }
};

// export function currencyService() {
//   fetch(`/rates/latest?apikey=${apiKey}&symbols=PKR,GBP,EUR,USD`)
//     .then((d) => d.json())
//     .then((d) => console.log(d));
// }
