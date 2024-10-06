import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../../data/interface/users.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * Retrieves all users from the specified collection and sends the response to the client.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object used to send back data.
 * @param {Collection<User>} collection - The MongoDB collection from which to fetch users.
 *
 * This function logs an informational message when attempting to fetch users, and logs success or
 * error messages based on the outcome. In case of success, it responds with a status code of 200
 * and the array of users. If an error occurs, it logs the error message and responds with a status
 * code of 500 along with an error message.
 */
export const getAllUsers = async (
	req: Request,
	res: Response,
	collection: Collection<User>
) => {
	try {
		logWithLocation(`Trying to get all users`, "info");
		const users = await collection.find().toArray();
		res.status(200);
		logWithLocation(`Got all users`, "success");
		logWithLocation(`${res.statusCode}`, "server");

		res.status(200).json(users);
	} catch (error: any) {
		logWithLocation(`Error fetching users: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(500).json({
			message: "Error fetching users",
			error: error.message,
		});
	}
};
