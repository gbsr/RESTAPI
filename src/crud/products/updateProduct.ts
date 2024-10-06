import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { productSchema } from "../../data/schema.js";
import { Product } from "../../data/interface/products.js";

/**
 * Updates a product in the specified collection.
 *
 * @param {Request} req - The request object containing the product ID as a parameter and the update data in the body.
 * @param {Response} res - The response object used to send back the results of the operation.
 * @param {Collection<Product>} collection - The MongoDB collection to perform the update operation on.
 *
 * This function performs the following steps:
 * - Logs an attempt to update the product.
 * - Checks if the product exists in the collection by its ID.
 * - Validates the provided update data against the predefined schema.
 * - Removes the `_id` field from the update data to avoid conflicts with MongoDB.
 * - Executes the update operation and responds based on the result.
 *
 * In case of an error during any of these steps, it catches the error and responds with a 500 status code along with an error message.
 */
export const updateProduct = async (
	req: Request,
	res: Response,
	collection: Collection<Product>
) => {
	const productId = req.params.id;
	const updateData = req.body;

	try {
		logWithLocation(
			`Trying to update product with id ${productId}`,
			"info"
		);

		/**
		 * Retrieves an existing product from the database using the provided productId.
		 * Logs a warning if the product is not found and responds with a 404 status and
		 * a corresponding message. Additionally, it validates the updateData against
		 * the productSchema, stripping unknown properties.
		 *
		 * @param {string} productId - The ID of the product to retrieve.
		 * @param {Object} updateData - The data to validate for updating the product.
		 * @throws Will log a warning message if the product is not found in the database.
		 */
		const existingProduct = await collection.findOne({
			_id: new ObjectId(productId),
		});

		if (!existingProduct) {
			logWithLocation(`Product not found: ${productId}`, "warning");
			res.status(404);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({ message: "Product not found" });
		}

		// This code validates updateData against the productSchema. If validation fails, it logs the error message and responds with a 400 status code along with a JSON message detailing the validation errors. The 'stripUnknown' option is enabled to remove properties not defined in the schema.
		const { error } = productSchema.validate(updateData, {
			// allowUnknown: true,
			stripUnknown: true,
		});

		if (error) {
			logWithLocation(`Validation error: ${error.message}`, "error");
			res.status(400);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "Invalid product data",
				error: error.details.map((detail) => detail.message),
			});
		}

		// Explicitly remove _id from updateData to prevent MongoDB error wating to update _id, which it can't because no dice
		// can probably do this less convoluted, but hey, if it works it works.
		const { _id, ...updateFields } = updateData;

		// Perform the update
		const updateResult = await collection.updateOne(
			{ _id: new ObjectId(productId) },
			{ $set: updateFields }
		);

		if (updateResult.modifiedCount > 0) {
			logWithLocation(`Product ${productId} updated.`, "success");
			res.status(200);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "Product updated successfully.",
			});
		} else {
			logWithLocation(`No changes made to product ${productId}`, "info");
			res.status(200);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "No changes were made to the product.",
			});
		}
	} catch (error: any) {
		logWithLocation(`Error updating product: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");
		return res.json({
			message: "Error updating product",
			error: error.message,
		});
	}
};
