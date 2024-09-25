import { Router, Request, Response } from "express";
import { Collection } from "mongodb";
import { User } from "../data/interface/users.js";
import { logWithLocation } from "../helpers/betterConsoleLog.js";
import { db } from "../data/dbConnection.js";
const userRouter = Router();
let collection: Collection<User>;

// Initialize collection
userRouter.use((req, res, next) => {
	collection = db.collection<User>("users");
	next();
});

// List all users
/* This part of the code defines a route handler for a GET request to the root path ("/") of the
userRouter. When a GET request is made to this path, the handler function is executed
asynchronously. */
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

export { userRouter };
