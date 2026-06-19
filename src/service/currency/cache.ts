interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
}

export const createCurrencyProxy = <T extends object>(targetFacade: T): T => {
  const cache = new Map<string, CacheEntry>();
  const CACHE_TTL = 5 * 60 * 1000;

  return new Proxy(targetFacade, {
    get(target, prop: string) {
      const originalMethod = target[prop];

      //Кэшируем Get-методы
      if (typeof originalMethod === "function" && prop.startsWith("get")) {
        return async (...args) => {
          //создаем уникальный ключ на основе метода и аргументов
          const cacheKey = `${prop}: ${JSON.stringify(args)}`;
          const cacheEntry = cache.get(cacheKey);

          if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TTL) {
            console.log(`[Proxy] Возврат из кэша для: ${cacheKey}`);
            return cacheEntry.data;
          }

          // Если в кэше нет данных или они устарели - делаем реальный запрос
          const result = await originalMethod.apply(target, args);

          cache.set(cacheKey, {
            data: result,
            timestamp: Date.now(),
          });

          return result;
        };
      }
    },
  });
};
