import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { productSchema } from "../../data/schema.js";
import { Product } from "../../data/interface/products.js";

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

		// First, check if the product exists
		const existingProduct = await collection.findOne({
			_id: new ObjectId(productId),
		});

		if (!existingProduct) {
			logWithLocation(`Product not found: ${productId}`, "warning");
			res.status(404);
			logWithLocation(`${res.status}`, "server");
			return res.json({ message: "Product not found" });
		}

		// Validate the update data
		const { error } = productSchema.validate(updateData, {
			// allowUnknown: true,
			stripUnknown: true,
		});

		if (error) {
			logWithLocation(`Validation error: ${error.message}`, "error");
			res.status(400);
			logWithLocation(`${res.status}`, "server");
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
			logWithLocation(`${res.status}`, "server");
			return res.json({
				message: "Product updated successfully.",
			});
		} else {
			logWithLocation(`No changes made to product ${productId}`, "info");
			res.status(200);
			logWithLocation(`${res.status}`, "server");
			return res.json({
				message: "No changes were made to the product.",
			});
		}
	} catch (error: any) {
		logWithLocation(`Error updating product: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.status}`, "server");
		return res.json({
			message: "Error updating product",
			error: error.message,
		});
	}
};
