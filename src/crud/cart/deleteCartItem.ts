import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * The function `deleteCartItem` deletes a specific product from a user's cart collection based on the
 * provided user and product IDs.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `deleteCartItem` function stands for the response
 * object in Express.js. It is used to send a response back to the client making the request. In this
 * function, it is used to send JSON responses with status codes such as 200 for success, 404 for
 * @param collection - The `collection` parameter in the `deleteCartItem` function refers to the
 * MongoDB collection where the cart items are stored. It is of type `Collection<Cart>`, indicating
 * that it is a collection of documents that represent cart items.
 */
export const deleteCartItem = async (
	req: Request,
	res: Response,
	collection: Collection<Cart>
) => {
	const { userId, productId } = req.params;
	logWithLocation(`Trying to find product.`, "info");

	try {
		const userObjectId = new ObjectId(userId);
		const productObjectId = new ObjectId(productId);

		const existingCartItem = await collection.findOne({
			userId: userObjectId,
			productId: productObjectId,
		});

		if (existingCartItem) {
			await collection.deleteOne({ _id: existingCartItem._id });
			res.status(200);
			logWithLocation(`Product deleted from cart`, "success");
			logWithLocation(`${res.status(200)}`, "server");

			res.status(200).json({ 
				message: "Product deleted from cart",
				productId: productId,
			});
		} else {
			res.status(404).json({ message: "Product not found in cart" });
		}
	} catch (error: any) {
		res.status(500);
		logWithLocation(
			`Error deleting product from cart: ${error.message}`,
			"error"
		);
		logWithLocation(`${res.status}`, "server");
		res.status(500).json({
			message: "Error deleting product from cart",
			error: error.message,
		});
	}
};
