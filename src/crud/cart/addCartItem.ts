import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * Adds an item to the shopping cart. If the item already exists in the cart, it updates the quantity.
 *
 * @param {Request} req - The request object containing parameters for userId, productId, and amount.
 * @param {Response} res - The response object used to send back the appropriate response.
 * @param {Collection<Cart>} collection - The MongoDB collection where cart items are stored.
 *
 * The function attempts to find an existing cart item using the provided userId and productId.
 * If found, it updates the amount of the existing cart item. If not found, it creates a new cart item.
 *
 * It includes error handling for any exceptions that may occur during the process, logging errors
 * to the server and responding with a status code of 500 along with an error message.
 */
export const addCartItem = async (
	req: Request,
	res: Response,
	collection: Collection<Cart>
) => {
	const { userId, productId, amount } = req.params;
	logWithLocation(`Trying to find shopping cart.`, "info");

	try {
		const userObjectId = new ObjectId(userId);
		const productObjectId = new ObjectId(productId);

		const existingCartItem = await collection.findOne({
			userId: userObjectId,
			productId: productObjectId,
		});

		if (existingCartItem) {
			logWithLocation(`Existing cart item found`, "info");
			const updatedAmount = existingCartItem.amount + parseInt(amount);
			await collection.updateOne(
				{ _id: existingCartItem._id },
				{ $set: { amount: updatedAmount } }
			);
			res.status(200);
			logWithLocation(`Product quantity updated in cart`, "success");
			logWithLocation(`${res.statusCode}`, "server");

			res.status(200).json({
				message: "Product quantity updated in cart",
				updatedAmount,
			});
		} else {
			const newCartItem: Cart = {
				userId: userObjectId,
				productId: productObjectId,
				amount: parseInt(amount),
				_id: new ObjectId(),
			};
			await collection.insertOne(newCartItem);
			logWithLocation(
				`Product added to cart: ${JSON.stringify(newCartItem)}`,
				"info"
			);
			res.status(201);
			logWithLocation(`${res.statusCode}`, "server");

			res.status(201).json({
				message: "Product added to cart",
				newCartItem,
			});
		}
	} catch (error: any) {
		logWithLocation(
			`Error adding product to cart: ${error.message}`,
			"error"
		);
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");
		res.status(500).json({
			message: "Error adding product to cart",
			error: error.message,
		});
	}
};
