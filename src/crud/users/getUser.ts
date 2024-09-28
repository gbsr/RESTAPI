import { Request, Response } from "express"; 
import { Collection, ObjectId } from "mongodb"; 
import { User } from "../../data/interface/users.js"; 
import { logWithLocation } from "../../helpers/betterConsoleLog.js";
import { idSchema } from "../../routes/userRouter.js";


export const getUser = async(req: Request, res: Response, collection: Collection<User>, id: ObjectId) => {
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

}