import { createApp } from "./app";

const app = createApp();

const PORT = 3002;

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server is running on http://localhost:${PORT}`);
});
