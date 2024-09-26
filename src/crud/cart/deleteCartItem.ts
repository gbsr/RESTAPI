import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

export const deleteCartItem = async (req: Request, res: Response, collection: Collection<Cart>) => {
    const { userId, productId } = req.params;

    try {
        const userObjectId = new ObjectId(userId);
        const productObjectId = new ObjectId(productId);

        const existingCartItem = await collection.findOne({
            userId: userObjectId,
            productId: productObjectId,
        });

        if (existingCartItem) {
            await collection.deleteOne({ _id: existingCartItem._id });
            res.status(200).json({ message: 'Product deleted from cart' });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error: any) {
        logWithLocation(`Error deleting product from cart: ${error.message}`, "error");
        res.status(500).json({
            message: "Error deleting product from cart",
            error: error.message,
        });
    }
};
