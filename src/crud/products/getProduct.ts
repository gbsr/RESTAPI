import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { productSchema } from "../../routes/productRouter.js";

/**
 * The function `getProduct` retrieves a product from a collection based on the provided ID and handles
 * validation, error logging, and response generation.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getProduct` function is the response object that
 * will be used to send the response back to the client making the request. It is an instance of the
 * Express `Response` object, which provides methods for sending responses such as `res.status()` and
 * `res.json
 * @param collection - The `collection` parameter in the `getProduct` function represents a collection
 * of products in a database. It is of type `Collection<Product>`, indicating that it is a collection
 * specifically designed to store instances of the `Product` class or interface. This parameter is used
 * to query the database for a
 * @returns The `getProduct` function returns a JSON response with a status code and message based on
 * the outcome of the product retrieval process.
 */
export const getProduct = async (
	req: Request,
	res: Response,
	collection: Collection<Product>,
	id: ObjectId
) => {
	// const { id } = req.params;

	try {
		logWithLocation(`Trying to get product with id: ${id}`, "info");
		const { error } = productSchema.validate({ id });

		if (error) {
			logWithLocation(`Validation error: ${error.message}`, "error");
			res.status(400);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "Invalid product ID",
				error: error.message,
			});
		}

		const product = await collection.findOne({ _id: new ObjectId(id) });

		if (!product) {
			logWithLocation(`Product not found: ${id}`, "error");
			res.status(404);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "Product not found",
				error: "Product not found",
			});
		}

		logWithLocation(`Product found: ${id}`, "success");
		res.status(200);
		logWithLocation(`${res.statusCode}`, "server");
		return res.json({
			message: "Product found",
			data: product,
		});
	} catch (error: any) {
		logWithLocation(`Error retrieving product: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");
		return res.json({
			message: "Error retrieving product",
			error: error.message,
		});
	}
};
