import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../data/interface/users.js";
import { db } from "../data/dbConnection.js";
import { getAllUsers } from "../crud/users/getAllUsers.js";
import { getUser } from "../crud/users/getUser.js";
import { addUser } from "../crud/users/addUser.js";
import { updateUser } from "../crud/users/updateUser.js";
import { deleteUser } from "../crud/users/deleteUser.js";
import { searchUsers } from "../crud/search/searchUser.js";

const userRouter = Router();
let collection: Collection<User>;

// Initialize collection
userRouter.use((req, res, next) => {
	collection = db.collection<User>("users");
	next();
});

// Search user request query
userRouter.get("/search", async (req: Request, res: Response) => {
	await searchUsers(req, res, collection);
});

// List all users
userRouter.get("/", async (req: Request, res: Response) => {
	await getAllUsers(req, res, collection);
});

// Get user by id
userRouter.get("/:id", async (req: Request, res: Response) => {
	const id = new ObjectId();
	await getUser(req, res, collection);
});

// Add a new user
userRouter.post("/", async (req: Request, res: Response) => {
	await addUser(req, res, collection);
});

// Change user
userRouter.put("/:id", async (req: Request, res: Response) => {
	await updateUser(req, res, collection);
});

// Delete user

userRouter.delete("/:id", async (req: Request, res: Response) => {
	await deleteUser(req, res, collection);
});

export { userRouter };
