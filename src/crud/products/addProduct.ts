import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { productSchema } from "../../data/schema.js";

/**
 * Adds a new product to the specified MongoDB collection.
 *
 * @param {Request} req - The request object containing product information in the body, including:
 *   - name: The name of the product.
 *   - price: The price of the product.
 *   - image: The URL or path to the product image.
 *   - amountInStock: The number of items available in stock.
 * @param {Response} res - The response object used to send back the desired HTTP response.
 * @param {Collection<Product>} collection - The MongoDB collection where the product will be stored.
 *
 * This function validates the incoming product data against the defined schema.
 * A try/catch block is used to handle any potential errors during execution:
 * - If there is a validation error, a 400 status code is returned along with an error message.
 * - If an unexpected error occurs during the database operation, a 500 status code is returned with an error message.
 */
export const addProduct = async (
	req: Request,
	res: Response,
	collection: Collection<Product>
) => {
	const { name, price, image, amountInStock } = req.body;
	try {
		logWithLocation(`Trying to add product: ${name}`, "info");
		const { error } = productSchema.validate({
			name,
			price,
			image,
			amountInStock,
		});

		if (error) {
			logWithLocation(`Validation error: ${error.message}`, "error");
			res.status(400);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "Invalid product data",
				error: error.message,
			});
		}
		const product: Product = {
			_id: new ObjectId(),
			name,
			price,
			image,
			amountInStock,
		};

		await collection.insertOne(product);
		logWithLocation(
			`Product added successfully: ${product.name}`,
			"success"
		);
		res.status(201);
		logWithLocation(`${res.statusCode}`, "server");
		res.json({
			product,
		});
	} catch (error: any) {
		logWithLocation(`Error adding product: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");
		res.json({
			message: "Error adding product",
			error: error.message,
		});
	}
};
