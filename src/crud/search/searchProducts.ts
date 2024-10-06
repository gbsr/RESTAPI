import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

// TODO setup proper logging with logWithLocation and server response logs

/**
 * Searches for products in the specified collection based on the query parameter.
 *
 * @param {Request} req - The Express request object containing the query.
 * @param {Response} res - The Express response object for sending the results.
 * @param {Collection<Product>} collection - The MongoDB collection to search products from.
 *
 * This function extracts the search query from the request parameters. If no query is provided,
 * it responds with a 400 status code and an error message. It performs a case-insensitive search
 * for product names matching the query using a regular expression. If successful, it returns the
 * found products as a JSON response. If an error occurs during the execution, it logs the error
 * and responds with a 500 status code and a generic internal server error message.
 */
export const searchProducts = async (
	req: Request,
	res: Response,
	collection: Collection<Product>
) => {
	try {
		const searchQuery = req.query.q as string;

		if (!searchQuery) {
			return res
				.status(400)
				.json({ message: "Search query is required" });
		}

		const products = await collection
			.find({
				name: { $regex: searchQuery, $options: "i" },
			})
			.toArray();

		res.json(products);
	} catch (error) {
		console.error("Error searching products:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
