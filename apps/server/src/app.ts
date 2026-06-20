import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

export const createApp = (): Application => {
	const app = express();

	// Global middlewares
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(helmet());

	// API routes

	return app;
};
