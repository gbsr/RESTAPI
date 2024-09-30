import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { idSchema } from "../../data/schema.js";
/**
 * The function `getProduct` retrieves a product from a collection based on the provided ID and handles
 * validation, error logging, and response generation.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getProduct` function is the response object that
 * will be used to send the response back to the client making the request. It is an instance of the
 * Express `Response` object, which provides methods for sending responses such as `res.status()` and
 * `res.json
 * @param collection - The `collection` parameter in the `getProduct` function refers to the MongoDB
 * collection where the product data is stored. It is of type `Collection<Product>`, indicating that it
 * is a collection of documents that represent products.
 * @param {ObjectId} id - The `id` parameter in the `getProduct` function is the unique identifier of
 * the product you want to retrieve from the database. It is used to query the database for the
 * specific product with that ID.
 * @returns The `getProduct` function returns a JSON response with a status code and message based on
 * the outcome of the product retrieval process. If the product is successfully found, it returns a
 * success message along with the product data and a status code of 200. If there is a validation error
 * with the product ID, it returns an error message indicating the validation issue and a status code
 * of 400. If there is an error getting the product, it returns an error message indicating the error
 * and a status code of 500.
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
