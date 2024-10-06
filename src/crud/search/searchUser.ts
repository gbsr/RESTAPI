import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { User } from "../../data/interface/users.js";

/**
 * Searches for users in the specified collection based on the query parameter provided in the request.
 *
 * @param {Request} req - The request object containing the query parameter 'q' for the search.
 * @param {Response} res - The response object used to send back the results or error messages.
 * @param {Collection<User>} collection - The MongoDB collection of users to search in.
 *
 * This function handles cases where the search query is missing by returning a 400 status code
 * and an error message. It also includes error handling to manage any issues that arise during
 * the search operation, logging the error and sending a 500 status code with an internal server
 * error message.
 */
export const searchUsers = async (
	req: Request,
	res: Response,
	collection: Collection<User>
) => {
	try {
		const searchQuery = req.query.q as string;

		if (!searchQuery) {
			return res
				.status(400)
				.json({ message: "Search query is required" });
		}

		const users = await collection
			.find({
				name: { $regex: searchQuery, $options: "i" },
			})
			.toArray();

		res.json(users);
	} catch (error) {
		console.error("Error searching users:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
