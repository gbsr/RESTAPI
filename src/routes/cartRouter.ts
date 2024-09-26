import { Router, Request, Response } from "express";
import { Collection } from "mongodb";
import { Cart } from "../data/interface/cart.js";
import { db } from "../data/dbConnection.js";
import { getCart } from "../crud/cart/getCart.js";
import { addCartItem } from "../crud/cart/addCartItem.js";
import { updateCartItem } from "../crud/cart/updateCartItem.js";
import { deleteCartItem } from "../crud/cart/deleteCartItem.js";

const cartRouter = Router();
let collection: Collection<Cart>;

// Initialize collection
cartRouter.use((req, res, next) => {
    collection = db.collection<Cart>("cart");
    next();
});

// GET all cart items
cartRouter.get("/", (req: Request, res: Response) => getCart(req, res, collection));

// POST add cart item
cartRouter.post("/add/:userId/:productId/:amount", (req: Request, res: Response) => addCartItem(req, res, collection));

// PUT update cart item
cartRouter.put("/update/:userId/:productId/:amount", (req: Request, res: Response) => updateCartItem(req, res, collection));

// DELETE cart item
cartRouter.delete("/delete/:userId/:productId", (req: Request, res: Response) => deleteCartItem(req, res, collection));

export { cartRouter };
