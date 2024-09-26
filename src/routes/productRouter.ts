import Joi from "joi";

import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { db } from "../data/dbConnection.js";

import { Product } from "../data/interface/products.js";
import { addProduct } from "../crud/products/addProduct.js";
import { deleteProduct } from "../crud/products/deleteProduct.js";
import { getProduct } from "../crud/products/getProduct.js";
import { getAllProducts } from "../crud/products/getAllProducts.js";

const productRouter = Router();
let collection: Collection<Product>;

/* This code  is defining and exporting a Joi schema object named
`productSchema`. This schema is used for validating the structure and content of data objects
representing products before they are processed or stored in the application. */
export const productSchema = Joi.object({
	name: Joi.string().min(1).required(),
	price: Joi.number().greater(0).required(),
	image: Joi.string().required(),
	amountInStock: Joi.number().required(),
});

/* The `idSchema` constant is defining a schema using Joi for validating the structure of an object
representing an ID. In this case, the schema specifies that the object must have a property named
`_id` which is a string, must be a hexadecimal value, must have a length of 24 characters, and is
required. This schema is used for validating the format of IDs before processing them in routes or
functions to ensure they meet the expected criteria. */
const idSchema = Joi.object({
	_id: Joi.string().hex().length(24).required(),
});

/* This is a middleware function that is being used by the `productRouter`. 
    It initialises the `collection` variable with the `products` collection from the database. 
    This is being done so that we can use the `collection` variable in the other routes. */
productRouter.use((req: Request, res: Response, next) => {
	collection = db.collection<Product>("products");
	next();
});

/* This function is defining a route handler for handling GET requests to fetch all products. When a GET
request is made to the root endpoint ("/"), this handler function is executed asynchronously. It
calls the `getAllProducts` function passing the request (`req`), response (`res`), and the
`collection` of products as parameters. */
productRouter.get("/", async (req: Request, res: Response) => {
	await getAllProducts(req, res, collection);
});

/* This function is defining a route handler for handling GET requests to fetch a specific product by its ID. */
productRouter.get("/:id", async (req: Request, res: Response) => {
	const id = new ObjectId();
	await getProduct(req, res, collection, id);
});

/* This is defining a route handler for handling a POST request to add a new product.
When a POST request is made to the "/post" endpoint, this handler function is executed
asynchronously. It calls the `addProduct` function passing the request (`req`), response (`res`),
and the `collection` of products as parameters. The `addProduct` function is responsible for adding
a new product to the database based on the data provided in the request body. */
productRouter.post("/post", async (req: Request, res: Response) => {
	await addProduct(req, res, collection);
});

/* The `productRouter.delete("/:id", async (req: Request, res: Response) => { await deleteProduct(req,
res, collection); });` code snippet is defining a route handler for handling DELETE requests to
delete a specific product by its ID. */
productRouter.delete("/:id", async (req: Request, res: Response) => {
	await deleteProduct(req, res, collection);
});

export { productRouter };
