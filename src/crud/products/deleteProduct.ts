import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Product } from "../../data/interface/products.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { deleteProductSchema } from "../../data/schema.js";

/**
 * Deletes a product from the database based on the provided product ID.
 * Validates the ID before attempting to perform the deletion.
 * Responds with appropriate status codes and messages for success,
 * validation errors, and server errors.
 *
 * @param {Object} req - The request object containing parameters.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 
* @param {Request} req - The request object containing the product ID in the parameters.
 * @param {Response} res - The response object to send the result of the deletion.
 * @param {Collection<Product>} collection - The collection from which the product will be deleted.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */

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
