import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * The function `addCartItem` in TypeScript handles adding products to a cart collection, updating the
 * quantity if the product already exists.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `addCartItem` function stands for the response
 * object in Express.js. It is used to send a response back to the client making the request. In this
 * function, it is being used to send JSON responses with status codes such as 200 for successful
 * updates and
 * @param collection - The `collection` parameter in the `addCartItem` function refers to a MongoDB
 * collection where cart items are stored. This collection is of type `Collection<Cart>`, indicating
 * that it stores documents of type `Cart`.
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
