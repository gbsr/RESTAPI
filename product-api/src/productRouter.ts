import { Router, Request, Response } from "express";
import { Collection } from "mongodb";
import { Product } from "./data/products.js";
import { logWithLocation } from "./helpers/betterConsoleLog.js";
import { db } from "../src/data/dbConnection.js";

const productRouter = Router();
let collection: Collection<Product>;

// Initialize collection
productRouter.use((req, res, next) => {
	collection = db.collection<Product>("products");
	next();
});

// List all products
productRouter.get("/", async (req: Request, res: Response) => {
	try {
		const products = await collection.find().toArray();
		res.status(200).json(products);
	} catch (error: any) {
		logWithLocation(`Error fetching products: ${error.message}`, "error");
		res.status(500).json({
			message: "Error fetching products",
			error: error.message,
		});
	}
});

export { productRouter };
