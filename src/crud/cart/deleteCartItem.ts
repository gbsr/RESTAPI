import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * Deletes an item from the user's cart based on the provided productId and userId.
 *
 * @param {Request} req - The request object containing userId and productId in the parameters.
 * @param {Response} res - The response object used to send back the status and messages.
 * @param {Collection<Cart>} collection - The MongoDB collection from which to delete the cart item.
 *
 * This function attempts to find the specified product in the cart. If the product exists,
 * it deletes the product and returns a success message. If the product is not found,
 * it returns a 404 status with a relevant message. In case of an error during the operation,
 * a 500 status is returned along with the error message.
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
