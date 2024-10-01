import { Request, Response } from "express"; 
import { Collection, ObjectId } from "mongodb"; 
import { User } from "../../data/interface/users.js"; 
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { userSchema } from "../../routes/userRouter.js";


export const addUser = async(req: Request, res: Response, collection: Collection<User>) => {
	
	const newUser: User = req.body;
	const { error } = userSchema.validate(newUser);
	
	if (error) {
		logWithLocation(`Validation error: ${error.message}`, "error");
		res.status(400).json({ message: "Invalid user data", error: error.message });
		return;
	}
	
	try {
		await collection.insertOne(newUser);
		res.status(201).json({
			message: "User created successfully",
			user: newUser,
		});
	} catch (error: any) {
		logWithLocation(`Error creating user: ${error.message}`, "error");
		res.status(500).json({
			message: "Error creating user",
			error: error.message,
		});
	}
}