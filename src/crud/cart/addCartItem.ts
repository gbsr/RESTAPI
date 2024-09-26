import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

export const addCartItem = async (req: Request, res: Response, collection: Collection<Cart>) => {
    const { userId, productId, amount } = req.params;

    try {
        const userObjectId = new ObjectId(userId);
        const productObjectId = new ObjectId(productId);

        const existingCartItem = await collection.findOne({
            userId: userObjectId,
            productId: productObjectId,
        });

        if (existingCartItem) {
            const updatedAmount = existingCartItem.amount + parseInt(amount);
            await collection.updateOne(
                { _id: existingCartItem._id },
                { $set: { amount: updatedAmount } }
            );
            res.status(200).json({ message: 'Product quantity updated in cart', updatedAmount });
        } else {
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
};
