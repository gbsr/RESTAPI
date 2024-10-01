import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../../data/interface/users.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

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
