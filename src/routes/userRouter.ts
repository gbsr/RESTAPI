import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { User } from "../data/interface/users.js";
import { db } from "../data/dbConnection.js";
import Joi from 'joi';
import {getAllUsers} from "../crud/users/getAllUsers.js"
import { getUser } from "../crud/users/getUser.js";
import { addUser } from "../crud/users/addUser.js";
import { changeUser } from "../crud/users/changeUser.js";
import { deleteUser } from "../crud/users/deleteUser.js";

const userRouter = Router();
let collection: Collection<User>;

// Joi schema for user validation
export const userSchema = Joi.object({
	name: Joi.string().min(1).required(),
	isAdmin: Joi.boolean().required(),
});

export const idSchema = Joi.object({
	_id: Joi.string().hex().length(24).required(),
})

// Initialize collection
userRouter.use((req, res, next) => {
	collection = db.collection<User>("users");
	next();
});

// List all users
userRouter.get("/", async (req: Request, res: Response) => {
	await getAllUsers(req, res, collection)
});

// Get user by id
userRouter.get("/:id", async (req: Request, res: Response) => {

	const id = new ObjectId()
	await getUser(req, res, collection, id)

});

// Add a new user
userRouter.post("/", async (req: Request, res: Response) => {
	await addUser( req, res, collection)
});

// Change user 
userRouter.put("/:id", async (req: Request, res: Response) => {
	await changeUser(req, res, collection )
	});

	userRouter.delete("/:id", async(req: Request, res: Response) => {
	await deleteUser(req, res, collection)
	})
	
	
	export { userRouter };
	