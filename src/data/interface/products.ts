import { ObjectId } from "mongodb";
export interface Product {
	_id: ObjectId;
	name: string;
	price: number;
	image: string;
	amountInStock: number;
}
