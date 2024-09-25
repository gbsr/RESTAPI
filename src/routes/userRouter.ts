import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../data/interface/users.js";
import { logWithLocation } from "../helpers/betterConsoleLog.js";
import { db } from "../data/dbConnection.js";
import Joi from 'joi';

const userRouter = Router();
let collection: Collection<User>;

// Joi schema for user validation
const userSchema = Joi.object({
	name: Joi.string().min(1).required(),
	isAdmin: Joi.boolean().required(),
});

// Initialize collection
userRouter.use((req, res, next) => {
	collection = db.collection<User>("users");
	next();
});

// List all users
userRouter.get("/", async (req: Request, res: Response) => {
	try {
		const users = await collection.find().toArray();
		res.status(200).json(users);
	} catch (error: any) {
		logWithLocation(`Error fetching users: ${error.message}`, "error");
		res.status(500).json({
			message: "Error fetching users",
			error: error.message,
		});
	}
});

// Add a new user
userRouter.post("/", async (req: Request, res: Response) => {
	const { error, value } = userSchema.validate(req.body);
	
	if (error) {
		logWithLocation(`Validation error: ${error.message}`, "error");
		res.status(400).json({ message: "Invalid user data", error: error.message });
		return;
	}
	
	const newUser: User = {
		...value,
		_id: new ObjectId(),
	};
	
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
});

// Change user 
userRouter.put("/:id", async (req: Request, res: Response) => {
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
	});
	
	
	export { userRouter };
	