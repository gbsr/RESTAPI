import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { userSchema } from "../../data/schema.js";
import { User } from "../../data/interface/users.js";

/**
 * Updates a user in the specified MongoDB collection.
 *
 * This function accepts a request and response object along with the user collection.
 * It performs the following steps:
 * 1. Extracts the user ID and update data from the request.
 * 2. Checks if the user exists in the collection.
 * 3. Validates the update data using a predefined schema.
 * 4. Removes the `_id` field from the update data to prevent errors during the update.
 * 5. Attempts to perform the update and returns an appropriate response based on the result.
 *
 * If any errors occur during the update process (e.g., user not found, validation error, etc.),
 * they are logged, and a corresponding error message is returned.
 *
 * @param {Request} req - The request object containing the user ID in the parameters and update data in the body.
 * @param {Response} res - The response object used to send back the appropriate HTTP response.
 * @param {Collection<User>} collection - The MongoDB collection from which the user will be updated.
 */
export const updateUser = async (
	req: Request,
	res: Response,
	collection: Collection<User>
) => {
	const userId = req.params.id;
	const updateData = req.body;

	try {
		logWithLocation(`Trying to update User with id ${userId}`, "info");

		// First, check if the product exists
		const existingProduct = await collection.findOne({
			_id: new ObjectId(userId),
		});

		if (!existingProduct) {
			logWithLocation(`User not found: ${userId}`, "warning");
			res.status(404);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({ message: "User not found" });
		}

		// Validate the update data
		const { error } = userSchema.validate(updateData, {
			// allowUnknown: true,
			stripUnknown: true,
		});

		if (error) {
			logWithLocation(`Validation error: ${error.message}`, "error");
			res.status(400);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "Invalid user data",
				error: error.details.map((detail) => detail.message),
			});
		}

		// Explicitly remove _id from updateData to prevent MongoDB error wating to update _id, which it can't because no dice
		// can probably do this less convoluted, but hey, if it works it works.
		const { _id, ...updateFields } = updateData;

		// Perform the update
		const updateResult = await collection.updateOne(
			{ _id: new ObjectId(userId) },
			{ $set: updateFields }
		);

		if (updateResult.modifiedCount > 0) {
			logWithLocation(`User ${userId} updated.`, "success");
			res.status(200);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "User updated successfully.",
			});
		} else {
			logWithLocation(`No changes made to user ${userId}`, "info");
			res.status(200);
			logWithLocation(`${res.statusCode}`, "server");
			return res.json({
				message: "No changes were made to the product.",
			});
		}
	} catch (error: any) {
		logWithLocation(`Error updating user: ${error.message}`, "error");
		res.status(500);
		logWithLocation(`${res.statusCode}`, "server");
		return res.json({
			message: "Error updating user",
			error: error.message,
		});
	}
};
