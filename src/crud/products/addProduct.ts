import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { productSchema } from "../../routes/productRouter.js";

export const addProduct = async (
	req: Request,
	res: Response,
	collection: Collection<Product>
) => {
	const { name, price, image, amountInStock } = req.body;
	try {
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
