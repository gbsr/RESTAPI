import "dotenv/config";
import express from "express";
import { productRouter } from "./routes/productRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import { logWithLocation } from "./helpers/betterConsoleLog.js";
import { connect, client } from "./data/dbConnection.js";
import cors from 'cors';



const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use( cors() )  // öppna API:et för resten av världen

// Routes
app.get("/", (req, res) => {
	res.status(200)
	res.status(200).send("Server is running");
	logWithLocation(`Server status: ${res.statusCode}`, "success");
});
app.use("/", express.static("../frontend"));

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);



/**
 * The `startServer` function attempts to connect to a server, starts listening on a specified port,
 * and logs the success or failure of the operation.
 */
// Start server
async function startServer() {
	try {
		await connect();
		app.listen(port, () => {
			logWithLocation(`Server is running on port ${port}`, "success");
		});
	} catch (error) {
		logWithLocation(`Failed to start server: ${error}`, "error");
		await client.close();
		process.exit(1);
	}
}

startServer();

// Graceful shutdown
/* The code snippet `process.on("SIGINT", async () => { ... })` is setting up an event listener for the
SIGINT signal in Node.js. */
process.on("SIGINT", async () => {
	console.log("Shutting down gracefully...");
	await client.close();
	console.log("MongoDB connection closed.");
	process.exit(0);
});
