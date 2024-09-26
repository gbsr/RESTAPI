import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { logWithLocation } from "../helpers/betterConsoleLog.js";
import { db } from "../data/dbConnection.js";
// import { User } from "../data/interface/users.js";
import { Product } from "../data/interface/products.js";
import Joi from "joi";
import { addProduct } from "../crud/products/addProduct.js";
import { deleteProduct } from "../crud/products/deleteProduct.js";
import { getProduct } from "../crud/products/getProduct.js";

const productRouter = Router();
let collection: Collection<Product>;

export const productSchema = Joi.object({
	name: Joi.string().min(1).required(),
	price: Joi.number().greater(0).required(),
	image: Joi.string().required(),
	amountInStock: Joi.number().required(),
});

const idSchema = Joi.object({
	_id: Joi.string().hex().length(24).required(),
});

async function getAllProducts() {
	const products = await collection.find().toArray();
	return products;
}

// Initialize collection
productRouter.use((req: Request, res: Response, next) => {
	collection = db.collection<Product>("products");
	next();
});

/* The `productRouter.get("/", async (req: Request, res: Response) => { ... }` function is handling a
GET request to fetch all products. */
productRouter.get("/", async (req: Request, res: Response) => {
	try {
		logWithLocation(`Trying to get all products..`, "info");
		const products = await getAllProducts();
		if (!products) {
			res.status(404);
			logWithLocation(`No products found..`, "server");
			logWithLocation(`${res.statusCode}`, "error");
			return res.status(404).json({
				message: "Products not found",
			});
		}
		logWithLocation(`${res.statusCode} - Products found!`, "success");
		res.status(200);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(200).json(products);
	} catch (error: any) {
		logWithLocation(`Error fetching products: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(500).json({
			message: "Error fetching products",
			error: error.message,
		});
	}
});

/* This part of the code defines a route handler for GET requests to fetch a specific product by its
ID. Returning the json in the response returns a json-object, then exits the function */
productRouter.get("/:id", async (req: Request, res: Response) => {
	const id = new ObjectId();
	await getProduct(req, res, collection, id);
});

/* The `productRouter.post("/post", async (req: Request, res: Response) => { ... }` function is
handling a POST request to create a new product. It also validating whether the product is valid or
not. If the product is valid, it will insert the product into the database. If the product is not
valid, it will return an error message. */
productRouter.post("/post", async (req: Request, res: Response) => {
	await addProduct(req, res, collection);
});

/* The code `productRouter.delete("/:id", async (req: Request, res: Response) => { await
deleteProduct(req, res, collection); });` is defining a route handler for handling a DELETE request
to delete a product. */
productRouter.delete("/:id", async (req: Request, res: Response) => {
	await deleteProduct(req, res, collection);
});
export { productRouter };

/**
 * The function `validate` checks if a given item exists and returns a
 * validation result with status information.
 * @param {Product | User | null} item - The `item` parameter in the `validate`
 * function can be either a `Product`, a `User`, or `null`.
 * @param {ObjectId} id - The `id` parameter in the `validate` function is of
 * type `ObjectId`. It is used to identify the specific item being validated,
 * whether it's a `Product` or a `User`.
 * @returns The `validate` function returns a `ValidationResult` object with the
 * following properties:
 * - `isValid`: a boolean indicating whether the item is valid or not.
 * - `item`: the validated item which can be a `Product`, `User`, or `null`.
 * - `statusCode`: a number indicating the status code of the validation result.
 * - `message`: a string message describing the validation result.
 */
// function validate(item: Product | User | null, id: ObjectId): ValidationResult {
// 	logWithLocation("Validating item..", "info");

// 	if (!item) {
// 		logWithLocation(`Item with id ${id} not found`, "error");
// 		return {
// 			isValid: false,
// 			item: null,
// 			statusCode: 404,
// 			message: "Item not found",
// 		};
// 	}

// 	// Is it product?
// 	if ("price" in item && "image" in item && "amountInStock" in item) {
// 		// Validate Product structure
// 		if (
// 			typeof item.name === "string" &&
// 			typeof item.price === "number" &&
// 			typeof item.image === "string" &&
// 			typeof item.amountInStock === "number"
// 		) {
// 			// It was valid, so it is a product
// 			logWithLocation(`Valid Product found: ${item.name}`, "success");
// 			return {
// 				isValid: true,
// 				item,
// 				statusCode: 200,
// 				message: "Valid Product found",
// 			};
// 		} else {
// 			// no it wasn't a product dammit
// 			logWithLocation(`Invalid Product structure: ${item.name}`, "error");
// 			return {
// 				isValid: false,
// 				item: null,
// 				statusCode: 400,
// 				message: "Invalid Product structure",
// 			};
// 		}
// 	}

// 	// Maybe its a user?
// 	if ("isAdmin" in item) {
// 		// Validate User structure
// 		if (
// 			typeof item.name === "string" &&
// 			typeof item.isAdmin === "boolean"
// 		) {
// 			// It was a user
// 			logWithLocation(`Valid User found`, "success");
// 			return {
// 				isValid: true,
// 				item,
// 				statusCode: 200,
// 				message: "Valid User found",
// 			};
// 		} else {
// 			// Just kdding, no it wasnt
// 			logWithLocation(`Invalid User structure`, "error");
// 			return {
// 				isValid: false,
// 				item: null,
// 				statusCode: 400,
// 				message: "Invalid User structure",
// 			};
// 		}
// 	}

// 	// Is it neither?
// 	logWithLocation(`Invalid item type`, "error");
// 	return {
// 		isValid: false,
// 		item: null,
// 		statusCode: 400,
// 		message: "Invalid item type",
// 	};
// }

// interface ValidationResult {
// 	// 	isValid: boolean;
// 	// 	item: Product | User | null;
// 	// 	statusCode: number;
// 	// 	message: string;
// 	// }
