import { Request, Response } from "express";
import { Collection } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * The function getAllProducts retrieves all products from a collection and handles errors
 * appropriately.
 * @param {Request} req - `req` is the request object representing the HTTP request made to the server.
 * It contains information about the request such as headers, parameters, and body data. This object is
 * used to extract data sent by the client to the server.
 * @param {Response} res - The `res` parameter in the `getAllProducts` function is the response object
 * that will be used to send back the response to the client making the request. It is an instance of
 * the Express Response object, which provides methods for sending responses like `res.status()` and
 * `res.json()`.
 * @param collection - The `collection` parameter in the `getAllProducts` function represents a
 * collection of products in a database. It is of type `Collection<Product>`, where `Product` is the
 * type of objects stored in the collection. This parameter is used to interact with the database
 * collection to retrieve all products asynchronously.
 * @returns The function `getAllProducts` returns a JSON response with a message and data based on the
 * outcome of fetching all products from a collection.
 */
export const getAllProducts = async (
	req: Request,
	res: Response,
	collection: Collection<Product>
) => {
	try {
		logWithLocation(`Trying to get all products..`, "info");

		const products = await collection.find().toArray();

		if (products.length === 0) {
			res.status(404);
			logWithLocation(`No products found..`, "error");
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "No products found",
			});
		}

		logWithLocation(`Products found!`, "success");
		res.status(200);
		logWithLocation(`${res.statusCode}`, "server");
		return res.json({
			/*message: "Products retrieved successfully",*/
			products,
		});
	} catch (error: any) {
		logWithLocation(`Error fetching products: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");
		return res.json({
			message: "Error fetching products",
			error: error.message,
		});
	}
};
