import "dotenv/config";
import express from "express";
import { productRouter } from "./routes/productRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import { logWithLocation } from "./helpers/betterConsoleLog.js";
import { connect, client } from "./data/dbConnection.js";
import cors from "cors";

// This Express.js application sets up a server with middleware for JSON parsing and CORS support.
// It serves static files from the "frontend" directory and defines routes for products, users, and cart functionality.
// The main route serves an index.html file and returns server status.
// The `startServer` function connects to the database and starts the server on a specified port,
// logging success or failure of this operation, and handles errors by closing the client and exiting the process.
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Enables Cross-Origin Resource Sharing (CORS) for the application, allowing it to accept requests from different origins.
app.use(cors());

// Serve static files from the "frontend" directory using Express.
app.use(express.static("./frontend"));

// Sets up a route handler for GET requests to the root URL ("/")
// that sends the "index.html" file from the "./frontend" directory.
app.get("/", (req, res) => {
	res.sendFile("index.html", { root: "./frontend" }); // Servera index.html direkt
});

// Routes
app.get("/", (req, res) => {
	res.status(200);
	res.status(200).send("Server is running");
	logWithLocation(`Server status: ${res.statusCode}`, "success");
});

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);

/**
 * Initializes and starts the server by establishing a connection.
 *
 * This function attempts to connect to a required service and, upon success, starts the server
 * listening on the specified port. If the connection fails, it logs an error message, closes
 * the client, and exits the process with a failure status.
 */
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

// Handles the SIGINT signal (e.g., when the process is interrupted)
// to gracefully shut down the application. It logs a message,
// closes the MongoDB connection, logs confirmation of the closure,
// and then exits the process with a status code of 0.
process.on("SIGINT", async () => {
	console.log("Shutting down gracefully...");
	await client.close();
	console.log("MongoDB connection closed.");
	process.exit(0);
});
