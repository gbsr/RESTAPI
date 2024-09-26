import { Request, Response } from "express";
import { Collection } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

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
			message: "Products retrieved successfully",
			data: products,
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
