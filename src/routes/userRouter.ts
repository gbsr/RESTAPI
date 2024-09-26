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

const idSchema = Joi.object({
	_id: Joi.string().hex().length(24).required(),
})

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

userRouter.get("/:id", async (req: Request, res: Response) => {
	try {
	   const { error } = idSchema.validate({_id: req.params.id});

	   if (error) {
		   logWithLocation(`Validation error: ${error.message}`, "error");
		   res.status(400).json({ message: "Invalid product data", error: error.message });
		   return;
	   }
	   const id = new ObjectId(req.params.id)
	   const product = await collection.findOne({_id: id});
   
   if(!product) {
	   return res.status(404).json({ message: "Not found" })
   }
   res.status(200).json(product);
   }
   catch (error: any ) {

   }
   
   logWithLocation(`Did not recieved product. `, "error")

});

// Add a new user
userRouter.post("/", async (req: Request, res: Response) => {
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

	userRouter.delete("/:id", async(req: Request, res: Response) => {
		const userId = req.params.id

		if(!ObjectId.isValid(userId)) {
			res.status(400).json({ message: "Invalid user ID"})
			return
		}
		try {
			const objectId = new ObjectId(userId)
			const result = await collection.deleteOne({ _id: objectId })

			if(result.deletedCount === 0) {
				res.status(404).json({ message: "User not found" })
				return
			}

			res.status(200).json({ message: "User deleted successfully" })
		} catch(error: any) {
			logWithLocation(`Error deleting user: ${error.message}`, "error");
			res.status(500).json({ message: "Error deleting user", error: error.message });
		}
	})
	
	
	export { userRouter };
	