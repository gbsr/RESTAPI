import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * Fetches the cart from the specified collection and returns it as a JSON response.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {Collection<Cart>} collection - The collection from which to fetch the cart.
 *
 * @returns {Promise<void>} - A promise that resolves to void.
 *
 * If an error occurs during fetching, a 500 status code is returned along with an error message.
 */
export const getCart = async (
	req: Request,
	res: Response,
	collection: Collection<Cart>
) => {
	try {
		logWithLocation(`Trying to fetch cart`, "info");

		const cart = await collection.find().toArray();
		res.status(200);
		logWithLocation(`Fetched cart: ${JSON.stringify(cart)}`, "success");
		logWithLocation(`${res.status}`, "server");

		res.status(200).json(cart);
	} catch (error: any) {
		res.status(500);
		logWithLocation(`Error fetching cart: ${error.message}`, "error");
		logWithLocation(`${res.status}`, "server");

		res.status(500).json({
			message: "Error fetching cart",
			error: error.message,
		});
	}
};

/**
 * Fetches the shopping cart for a specific user based on the user ID provided in the request parameters.
 *
 * @param {Request} req - The request object containing the user ID in its parameters.
 * @param {Response} res - The response object used to send back the desired HTTP response.
 * @param {Collection<Cart>} collection - The MongoDB collection from which to retrieve the cart data.
 *
 * This function attempts to log information regarding the process of fetching the cart and handles errors
 * that may arise during the operation. In case of an error, a 500 status code is returned along with
 * an error message detailing the issue.
 */
export const getCartByUserId = async (
	req: Request,
	res: Response,
	collection: Collection<Cart>
) => {
	const { userId } = req.params;
	try {
		logWithLocation(
			`Trying to find cart for the specific user ${userId}`,
			"info"
		);
		const objectId = new ObjectId(userId);
		const cart = await collection.find({ userId: objectId }).toArray();

		res.status(200);
		logWithLocation(
			`Found cart for the specific user ${userId}`,
			"success"
		);
		logWithLocation(`${res.status}`, "server");
		res.status(200).json(cart);
	} catch (error: any) {
		logWithLocation(`Error fetching cart: ${error.message}`, "error");
		res.status(500);

		logWithLocation(`${res.status}`, "server");
		res.status(500).json({
			message: "Error fetching cart",
			error: error.message,
		});
	}
};
