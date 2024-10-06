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

/**
 * A router for handling user-related HTTP requests.
 *
 * Initializes the user collection in the database and provides
 * endpoints for searching, listing, retrieving, adding, updating,
 * and deleting users. Each route handler requires a request and
 * response object, and utilizes the shared user collection.
 *
 * The following routes are defined:
 *
 * - GET /search: Searches for users based on request query.
 * - GET /:id: Retrieves a user by their ID. The ID is parsed
 *   from the route parameters.
 * - GET /: Lists all users.
 * - POST /: Adds a new user using data from the request body.
 * - PUT /:id: Updates an existing user specified by the ID in
 *   the route parameters.
 * - DELETE /:id: Deletes a user specified by the ID in the
 *   route parameters.
 *
 * Each route handler passes the request and response to
 * their corresponding functionality and awaits the result.
 */
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
