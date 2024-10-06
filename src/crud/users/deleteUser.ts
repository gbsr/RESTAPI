import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../../data/interface/users.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

/**
 * Deletes a user from the database based on the user ID provided in the request parameters.
 *
 * @param {Request} req - The request object containing parameters, notably the user ID.
 * @param {Response} res - The response object used to send the response back to the client.
 * @param {Collection<User>} collection - The MongoDB collection from which to delete the user.
 *
 * This function first validates the provided user ID:
 * - If the user ID is invalid, it logs an error and responds with a 400 status code and an error message.
 *
 * It then attempts to delete the user by:
 * - Logging the attempt to delete the user.
 * - Checking if the user exists and corresponding deletion result.
 * - If no user is found, it logs an error and responds with a 404 status code and a not found message.
 * - If the user is successfully deleted, it logs a success message and responds with a 200 status code and a success message.
 *
 * If an error occurs during the deletion process, it logs the error and responds with a 500 status code and an error message.
 */
export const deleteUser = async (
	req: Request,
	res: Response,
	collection: Collection<User>
) => {
	const userId = req.params.id;

	if (!ObjectId.isValid(userId)) {
		logWithLocation(`Invalid user ID: ${userId}`, "error");
		res.status(400);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(400).json({ message: "Invalid user ID" });
		return;
	}
	try {
		logWithLocation(`"Trying to deleted user ${userId}`, "info");
		const objectId = new ObjectId(userId);
		const result = await collection.deleteOne({ _id: objectId });

		if (result.deletedCount === 0) {
			logWithLocation(`"User not found`, "error");
			res.status(494);
			logWithLocation(`${res.statusCode}`, "server");

			res.status(404).json({ message: "User not found" });
			return;
		}
		logWithLocation(`User deleted Sucessfully!`, "success");
		res.status(200);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error: any) {
		logWithLocation(`Error deleting user: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(500).json({
			message: "Error deleting user",
			error: error.message,
		});
	}
};
