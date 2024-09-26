import { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { Cart } from "../../data/interface/cart.js";
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

export const getCart = async (req: Request, res: Response, collection: Collection<Cart>) => {
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
};


// hämta en spesifik kundvagn baserat på user id 

export const getCartByUserId = async (req: Request, res: Response, collection: Collection<Cart>) => {
    const { userId } = req.params;
    try {
        const objectId = new ObjectId(userId);
        const cart = await collection.find({ userId: objectId }).toArray();
        res.status(200).json(cart);
    } catch (error: any) {
        logWithLocation(`Error fetching cart: ${error.message}`, "error");
        res.status(500).json({
            message: "Error fetching cart",
            error: error.message,
        });
    }
}
