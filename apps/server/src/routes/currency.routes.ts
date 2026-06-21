import { Router, Request, Response } from "express";

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
  } catch {}
});
