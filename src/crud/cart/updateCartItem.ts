import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

export const updateCartItem = async (req: Request, res: Response, collection: Collection<Cart>) => {
    const { userId, productId, amount } = req.params;

    try {
        const userObjectId = new ObjectId(userId);
        const productObjectId = new ObjectId(productId);

        const existingCartItem = await collection.findOne({
            userId: userObjectId,
            productId: productObjectId,
        });

        if (existingCartItem) {
            const updatedAmount = parseInt(amount);
            await collection.updateOne(
                { _id: existingCartItem._id },
                { $set: { amount: updatedAmount } }
            );
            res.status(200).json({ message: 'Product quantity updated in cart', updatedAmount });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error: any) {
        logWithLocation(`Error updating product in cart: ${error.message}`, "error");
        res.status(500).json({
            message: "Error updating product in cart",
            error: error.message,
        });
    }
};
