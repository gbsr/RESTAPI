import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

// TODO: Update this with proper mintlify once it's back online hehe
/**
 * The function `updateCartItem` fetches cart data from a collection and updates the item, and handles
 * errors appropriately.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request that the
 * server receives. It contains information about the request such as the URL, headers, parameters, and
 * body data. This parameter is typically used to extract data sent by the client to the server.
 * @param {Response} res - The `res` parameter in the `getCart` function is the response object that
 * will be used to send a response back to the client making the request. It is an instance of the
 * `Response` class from the Express.js framework. This object allows you to set the HTTP status code,
 * headers
 * @param collection - The `collection` parameter in the `getCart` function represents a MongoDB
 * collection where the cart data is stored. It is of type `Collection<Cart>`, indicating that it is a
 * collection of documents of type `Cart`. This parameter is used to interact with the MongoDB
 * collection to fetch the cart
 */
export const updateCartItem = async (
	req: Request,
	res: Response,
	collection: Collection<Cart>
) => {
	const { userId, productId, amount } = req.params;

	try {
		const userObjectId = new ObjectId(userId);
		const productObjectId = new ObjectId(productId);

		const existingCartItem = await collection.findOne({
			userId: userObjectId,
			productId: productObjectId,
		});

		if (existingCartItem) {
			const updatedAmount = parseInt(amount);
			await collection.updateOne(
				{ _id: existingCartItem._id },
				{ $set: { amount: updatedAmount } }
			);
			res.status(200).json({
				message: "Product quantity updated in cart",
				productId: productId,
				updatedAmount,
			});
		} else {
			res.status(404).json({ message: "Product not found in cart" });
		}
	} catch (error: any) {
		logWithLocation(
			`Error updating product in cart: ${error.message}`,
			"error"
		);
		res.status(500).json({
			message: "Error updating product in cart",
			error: error.message,
		});
	}
};
