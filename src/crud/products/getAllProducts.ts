import { Request, Response } from "express";
import { Collection } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * Retrieves all products from a specified collection and sends the response to the client.
 *
 * @param {Request} req - The request object representing the HTTP request.
 * @param {Response} res - The response object used to send the HTTP response.
 * @param {Collection<Product>} collection - The MongoDB collection from which products are fetched.
 *
 * This function attempts to find all products in the provided collection.
 * It logs various statuses during the process:
 * - If products are found, it returns them with a 200 status.
 * - If no products are found, it logs an error and responds with a 404 status.
 * - If an error occurs while fetching the products, it catches the error, logs it,
 *   and responds with a 500 status along with the error message.
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
