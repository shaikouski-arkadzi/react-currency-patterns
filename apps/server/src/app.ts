import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { CurrencyRouter } from "./routes/currency.routes";

export const createApp = (): Application => {
  const app = express();

  // Global middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  // API routes
  app.use("/api/currency", CurrencyRouter);

  return app;
};
