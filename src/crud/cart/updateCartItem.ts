import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * Updates the quantity of a specific product in a user's shopping cart.
 *
 * @param {Request} req - The request object containing userId, productId, and amount as parameters.
 * @param {Response} res - The response object used to send back the desired HTTP response.
 * @param {Collection<Cart>} collection - The MongoDB collection where cart items are stored.
 *
 * This function attempts to find an existing cart item using the userId and productId.
 * If the item is found, it updates the amount with the provided value and sends a success response.
 * If the item is not found, it sends a 404 response indicating that the product is not in the cart.
 * In case of an error during the process, it logs the error and sends a 500 response with an error message.
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
