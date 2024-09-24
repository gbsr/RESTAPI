import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "./data/products.js";
import { logWithLocation } from "./helpers/betterConsoleLog.js";
import { db } from "../src/data/dbConnection.js";

const productRouter = Router();
let collection: Collection<Product>;

// Initialize collection
productRouter.use((req: Request, res: Response, next) => {
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

/* This part of the code defines a route handler for GET requests to fetch a specific product by its
ID. Returning the json in the response returns a json-object, then exits the function */
productRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const id = new ObjectId(req.params.id);
		logWithLocation(`Trying to get product with id ${id}`, "info");
		const product = await collection.findOne({ _id: id });

		if (!product) {
			logWithLocation(`Product with id ${id} not found`, "error");
			res.status(404);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({ message: "Product not found" });
		} else {
			logWithLocation(`Product with id ${id} found`, "success");
			res.status(200);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({ message: `Product with id ${id} found` });
		}
	} catch (error: any) {
		logWithLocation(error.message, "error");
		logWithLocation(`${res.statusCode}`, "serverResponse");
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
});

export { productRouter };
