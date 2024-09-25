import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../data/interface/cart.js";
import { logWithLocation } from "../helpers/betterConsoleLog.js";
import { db } from "../data/dbConnection.js";

const cartRouter = Router();
let collection: Collection<Cart>;

// Initialize collection
cartRouter.use((req, res, next) => {
	collection = db.collection<Cart>("cart");
	next();
});

// List all cart
/* This part of the code defines a route handler for a GET request to the root path ("/") of the
userRouter. When a GET request is made to this path, the handler function is executed
asynchronously. */
cartRouter.get("/", async (req: Request, res: Response) => {
	try {
		const cart = await collection.find().toArray();
		res.status(200).json(cart);
	} catch (error: any) {
		logWithLocation(`Error fetching cart: ${error.message}`, "error");
		res.status(500).json({
			message: "Error fetching cart",
			error: error.message,
		});
	}
});

// ____________ POST _____________ //
/* URL for Insomnia "http://localhost:1338/cart/add/66f3daf29ae1b485624b0861/66f28c753953d47e96644700/1" */

cartRouter.post("/add/:userId/:productId/:amount", async (req: Request, res: Response) => {
	const { userId, productId, amount } = req.params;
  
	try {
	  // create ObjectIds for userId and productId
	  const userObjectId = new ObjectId(userId);
	  const productObjectId = new ObjectId(productId);
  
	  // check if product already exists in cart
	  const existingCartItem = await collection.findOne({
		userId: userObjectId,
		productId: productObjectId,
	  });
  
	  if (existingCartItem) {
		// if the product already exists, update the amount
		const updatedAmount = existingCartItem.amount + parseInt(amount);
		await collection.updateOne(
		  { _id: existingCartItem._id },
		  { $set: { amount: updatedAmount } }
		);
		res.status(200).json({ message: 'Product quantity updated in cart', updatedAmount });
	  } else {
		// if the product does not exist, add it to the cart
		const newCartItem: Cart = {
			userId: userObjectId,
			productId: productObjectId,
			amount: parseInt(amount),
			_id: new ObjectId(),
		};
		await collection.insertOne(newCartItem);
		res.status(201).json({ message: 'Product added to cart', newCartItem });
	  }
	} catch (error: any) {
	  logWithLocation(`Error adding product to cart: ${error.message}`, "error");
	  res.status(500).json({
		message: "Error adding product to cart",
		error: error.message,
	  });
	}
  });


  // ____________ PUT _____________ //
  // to do uppdate amount in cart


// ____________ DELETE _____________ //
 // to do delete product from cart


  export { cartRouter };