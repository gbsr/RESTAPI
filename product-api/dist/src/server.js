import "dotenv/config";
import express from "express";
import { productRouter, connect, client } from "./productRouter.js";
import { logWithLocation } from "./helpers/betterConsoleLog.js";
import { userRouter } from "./userRouter.js";
import { cartRouter } from "./cartRouter.js";
const app = express();
const port = process.env.PORT;
// Middleware
app.use(express.json());
// Routes
app.get("/", (req, res) => {
    res.status(200).send("Server is running");
    logWithLocation(`Server status: ${res.statusCode}`, "success");
});
app.use("/products", productRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);
// Start server
async function startServer() {
    try {
        await connect();
        app.listen(port, () => {
            logWithLocation(`Server is running on port ${port}`, "success");
        });
    }
    catch (error) {
        logWithLocation(`Failed to start server: ${error}`, "error");
        await client.close();
        process.exit(1);
    }
}
startServer();
// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await client.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
});
