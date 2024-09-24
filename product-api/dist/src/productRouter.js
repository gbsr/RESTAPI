import { Router } from "express";
import { logWithLocation } from "./helpers/betterConsoleLog.js";
import { db } from "../src/data/dbConnection.js";
const productRouter = Router();
let collection;
// Initialize collection
productRouter.use((req, res, next) => {
    collection = db.collection("products");
    next();
});
// List all products
productRouter.get("/", async (req, res) => {
    try {
        const products = await collection.find().toArray();
        res.status(200).json(products);
    }
    catch (error) {
        logWithLocation(`Error fetching products: ${error.message}`, "error");
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
});
export { productRouter };
