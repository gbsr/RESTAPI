import { Router, Request, Response } from "express";
import { Collection } from "mongodb";
import { Cart } from "../data/interface/cart.js";
import { logWithLocation } from "../helpers/betterConsoleLog.js";
import { db } from "../data/dbConnection.js";

const cartRouter = Router();
let collection: Collection<Cart>;

// Initialize collection
cartRouter.use((req, res, next) => {
	collection = db.collection<Cart>("cart");
	next();
});

// List all cart
/* This part of the code defines a route handler for a GET request to the root path ("/") of the
userRouter. When a GET request is made to this path, the handler function is executed
asynchronously. */
cartRouter.get("/", async (req: Request, res: Response) => {
	try {
		const cart = await collection.find().toArray();
		res.status(200).json(cart);
	} catch (error: any) {
		logWithLocation(`Error fetching cart: ${error.message}`, "error");
		res.status(500).json({
			message: "Error fetching cart",
			error: error.message,
		});
	}
});

export { cartRouter };
