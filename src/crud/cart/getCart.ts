import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * The function `getCart` fetches cart data from a collection and sends it as a JSON response, handling
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
 * The function `getCartByUserId` retrieves a user's cart based on the user ID provided in the request
 * parameters.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getCartByUserId` function is the response object
 * that will be used to send a response back to the client making the request. It is an instance of the
 * `Response` class from the Express.js framework. In this function, it is used to send a
 * @param collection - The `collection` parameter in the `getCartByUserId` function is of type
 * `Collection<Cart>`. This indicates that it is a collection of documents of type `Cart`. The function
 * is expected to retrieve cart data based on the `userId` provided in the request parameters from this
 * collection.
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
