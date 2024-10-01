import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../../data/interface/users.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { idSchema } from "../../data/schema.js";

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
