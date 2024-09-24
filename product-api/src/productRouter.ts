import "dotenv/config";

import { MongoClient, Db, Collection } from "mongodb";
import { Router, Request, Response } from "express";
import { Product } from "./data/products.js";
import { logWithLocation } from "./helpers/betterConsoleLog.js";

const productRouter = Router();

const connectionString = process.env.CONNECTION_STRING;
const dbName = process.env.MONGODB_DB_NAME;

if (!connectionString) {
	console.error("CONNECTION_STRING is not defined in environment variables");
	process.exit(1);
}

if (!dbName) {
	console.error("MONGODB_DB_NAME is not defined in environment variables");
	process.exit(1);
}

const client: MongoClient = new MongoClient(connectionString);
let db: Db;
let collection: Collection<Product>;

async function connect() {
	try {
		await client.connect();
		db = client.db(dbName);
		collection = db.collection<Product>("products");
		logWithLocation(`Connected to the database successfully.`, "success");
		logWithLocation(
			`Number of products: ${await collection.countDocuments()}`,
			"success"
		);
	} catch (error: any) {
		logWithLocation(`Failed to connect to the database. ${error}`, "error");
		throw error; // Re-throw to handle in server.ts
	}
}

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
	await client.close();
});

export { productRouter, connect, client };
