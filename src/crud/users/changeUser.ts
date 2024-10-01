import { Request, Response } from "express"; 
import { Collection, ObjectId } from "mongodb"; 
import { User } from "../../data/interface/users.js"; 
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { userSchema } from "../../routes/userRouter.js";

export const changeUser = async (req: Request, res: Response, collection: Collection<User>) => {
	const userId = req.params.id;
	
	if (!ObjectId.isValid(userId)) {
		res.status(400).json({ message: "Invalid user ID" });
		return;
	}
	
	const { error, value } = userSchema.validate(req.body);
	
	if (error) {
		logWithLocation(`Validation error: ${error.message}`, "error");
		res.status(400).json({ message: "Invalid user data", error: error.message });
		return;
	}
	
	try {
		const updatedUser = await collection.updateOne(
			{ _id: new ObjectId(userId) },
			{ $set: value }
			);
			
			if (updatedUser.matchedCount === 0) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			
			if (updatedUser.modifiedCount === 0) {
				res.status(200).json({ message: "No changes were made to the user" });
				return;
			}
			
			res.status(200).json({
				message: "User updated successfully",
				modifiedCount: updatedUser.modifiedCount
			});
		} catch (error: any) {
			logWithLocation(`Error updating user: ${error.message}`, "error");
			res.status(500).json({ message: "Error updating user", error: error.message });
		}
	}