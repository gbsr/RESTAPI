import { Request, Response } from "express"; 
import { Collection, ObjectId } from "mongodb"; 
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { User } from "../../data/interface/users.js";

export const searchUsers = async(req: Request, res: Response, collection: Collection<User>) => {
	try {
        const searchQuery = req.query.q as string;

        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const users = await collection.find({
            name: { $regex: searchQuery, $options: 'i' }
        }).toArray();

        res.json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

    
}

