import { Router, Request, Response } from "express";
import { error } from "node:console";

const router = Router();

const TARGET_API_BASE = "https://api.currencyfreaks.com/v2.0";

router.all(/.*/, async (req: Request, res: Response): Promise<void> => {
  try {
    const API_KEY = process.env.CURRENCY_API_KEY;

    if (!API_KEY) {
      res.status(500).json({ error: "API ключ не настроен на сервере" });
      return;
    }

    const endpoint = req.path;

    const targetUrl = new URL(`${TARGET_API_BASE}${endpoint}`);

    targetUrl.searchParams.append("apikey", API_KEY);

    for (const [key, value] of Object.entries(req.query)) {
      if (typeof value === "string") {
        targetUrl.searchParams.append(key, value);
      } else if (Array.isArray(value)) {
        targetUrl.searchParams.append(key, value.join(","));
      }
    }

    const fetchOptions: RequestInit = {
      method: req.method,
      headers: {
        Accept: "application/json",
        ...(req.headers["content-type"] && {
          "Content-Type": req.headers["content-type"],
        }),
      },
      ...(req.method !== "GET" && req.method !== "HEAD" && req.body
        ? { body: JSON.stringify(req.body) }
        : {}),
    };

    const response = await fetch(targetUrl.toString(), fetchOptions);

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("[Currency API Router Error]", error.message);
      res.status(500).json({
        error: "Internal gateway error",
        message: error.message,
      });
    }
  }
});

export const CurrencyRouter = router;
