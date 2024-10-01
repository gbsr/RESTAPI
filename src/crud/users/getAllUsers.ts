import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../../data/interface/users.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

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
