import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import Joi from "joi";

// TODO: Move this schema, and all other schemas into their own schema-file!
const deleteProductSchema = Joi.object({
	id: Joi.string().required().length(24).hex(),
});

export const deleteProduct = async (
	req: Request,
	res: Response,
	collection: Collection<Product>
) => {
	const { id } = req.params;

	logWithLocation(`Trying to delete product with id: ${id}`, "info");
	try {
		const { error } = deleteProductSchema.validate({
			id,
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

		if (!id && typeof id !== "string") {
			res.status(400);
			logWithLocation(`Invalid product ID: ${id}`, "error");
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({ message: "Invalid product ID" });
		}

		const result = await collection.deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 1) {
			logWithLocation(`Product deleted with ID: ${id}`, "success");
			res.status(200);
			logWithLocation(`${res.statusCode}`, "server");
			res.json({ message: "Product deleted successfully" });
		} else {
			res.status(404);
			logWithLocation(`Product not found with id: ${id}`, "error");
			logWithLocation(`${res.statusCode}`, "server");
			res.json({ message: "Product not found" });
		}
	} catch (error: any) {
		logWithLocation(`Error deleting product: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");
		res.json({
			message: "Error deleting product",
			error: error.message,
		});
	}
};
