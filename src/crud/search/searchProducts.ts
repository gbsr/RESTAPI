import { Request, Response } from "express"; 
import { Collection, ObjectId } from "mongodb"; 
import { Product } from "../../data/interface/products.js"; 
import { logWithLocation } from "../../helpers/betterConsoleLog.js";

export const searchProducts = async(req: Request, res: Response, collection: Collection<Product>) => {
	try {
        const searchQuery = req.query.q as string;

        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const products = await collection.find({
            name: { $regex: searchQuery, $options: 'i' }
        }).toArray();

        res.json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

    
}

