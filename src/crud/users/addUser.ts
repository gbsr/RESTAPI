import { Request, Response } from "express";
import { Collection } from "mongodb";
import { User } from "../../data/interface/users.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { userSchema } from "../../data/schema.js";

/**
 * Adds a new user to the specified collection.
 *
 * @param {Request} req - The request object containing user data in the body.
 * @param {Response} res - The response object used to send responses back to the client.
 * @param {Collection<User>} collection - The MongoDB collection where the user will be added.
 *
 * This function validates the user data received in the request. If validation fails,
 * it responds with a 400 status code and an error message. If validation succeeds,
 * it attempts to insert the new user into the collection. In case of an error during
 * insertion, it catches the error, logs it, and responds with a 500 status code and an
 * appropriate error message. The function also logs information about the status and
 * actions taken.
 */
export const addUser = async (
	req: Request,
	res: Response,
	collection: Collection<User>
) => {
	const newUser: User = req.body;
	const { error } = userSchema.validate(newUser);

	if (error) {
		logWithLocation(`Validation error: ${error.message}`, "error");
		res.status(400);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(400).json({
			message: "Invalid user data",
			error: error.message,
		});
		return;
	}

	try {
		logWithLocation(`Trying to add new user`, "info");
		await collection.insertOne(newUser);
		logWithLocation(`User created successfully`, "success");
		res.status(201);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(201).json({
			message: "User created successfully",
			user: newUser,
		});
	} catch (error: any) {
		logWithLocation(`Error creating user: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");

		res.status(500).json({
			message: "Error creating user",
			error: error.message,
		});
	}
};
