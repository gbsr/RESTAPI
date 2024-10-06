import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../../data/interface/users.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { idSchema } from "../../data/schema.js";

/**
 * Retrieves a user by ID from the specified collection.
 *
 * This function first validates the provided user ID against a schema. If the
 * validation fails, it responds with a 400 status code and an error message.
 * If the ID is valid, it attempts to find the user in the collection.
 * It handles scenarios where the user is not found (responding with a
 * 404 status code) and also catches any errors that occur during the
 * retrieval process, responding with a 500 status code.
 *
 * @param {Request} req - The request object containing the user ID in params.
 * @param {Response} res - The response object to send the response back to the client.
 * @param {Collection<User>} collection - The MongoDB collection to query for the user.
 */
export const getUser = async (
	req: Request,
	res: Response,
	collection: Collection<User>
) => {
	try {
		const { id } = req.params;
		logWithLocation(`Trying to get user with id: ${id}`, "info");

		const { error } = idSchema.validate({ _id: id });
		if (error) {
			logWithLocation(`Validation error: ${error.message}`, "error");
			res.status(400);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "Invalid user ID",
				error: error.message,
			});
		}

		const _id = new ObjectId(id);
		const user = await collection.findOne({ _id });

		if (!user) {
			logWithLocation(`User not found: ${id}`, "error");
			res.status(404);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "User not found",
				error: "User not found",
			});
		}

		logWithLocation(`User found: ${id}`, "success");
		res.status(200);
		logWithLocation(`${res.statusCode}`, "server");
		return res.json({
			message: "User found",
			data: user,
		});
	} catch (error: any) {
		logWithLocation(`Error retrieving user: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");
		return res.json({
			message: "Error retrieving user",
			error: error.message,
		});
	}
};
