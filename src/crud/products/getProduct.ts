import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { idSchema } from "../../data/schema.js";

/**
 * Retrieves a product from the database by its ID.
 *
 * @param {Request} req - The HTTP request object, expected to contain the product ID in the URL parameters.
 * @param {Response} res - The HTTP response object used to send the response back to the client.
 * @param {Collection<Product>} collection - The MongoDB collection from which to retrieve the product.
 * @param {ObjectId} id - The ObjectId of the product (not used directly, as it is redefined from req.params).
 *
 * The function performs the following steps:
 * - Validates the ID from the request parameters against a predefined schema.
 * - Responds with a 400 status and an error message if validation fails.
 * - Searches for the product in the collection; responds with a 404 status if not found.
 * - Responds with a 200 status and the product data if found.
 * - Catches any exceptions that occur during the process, logging the error and responding with a 500 status.
 */
export const getProduct = async (
	req: Request,
	res: Response,
	collection: Collection<Product>,
	id: ObjectId
) => {
	try {
		const { id } = req.params;
		logWithLocation(`Trying to get product with id: ${id}`, "info");
		const { error } = idSchema.validate({ _id: id });

		if (error) {
			logWithLocation(`Validation error: ${error.message}`, "error");
			res.status(400);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "Invalid product ID",
				error: error.message,
			});
		}
		const _id = new ObjectId(id);
		const product = await collection.findOne({ _id });

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
