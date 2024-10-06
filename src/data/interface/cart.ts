import { ObjectId } from "mongodb";
export interface Cart {
	_id: ObjectId;
	userId: ObjectId;
	productId: ObjectId;
	amount: number;
}
