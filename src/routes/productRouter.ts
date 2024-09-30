import Joi from "joi";

import { Router, Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { db } from "../data/dbConnection.js";

import { Product } from "../data/interface/products.js";
import { addProduct } from "../crud/products/addProduct.js";
import { deleteProduct } from "../crud/products/deleteProduct.js";
import { getProduct } from "../crud/products/getProduct.js";
import { getAllProducts } from "../crud/products/getAllProducts.js";
import { updateProduct } from "../crud/products/updateProduct.js";

const productRouter = Router();
let collection: Collection<Product>;

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

productRouter.put("/:id", async (req: Request, res: Response) => {
	await updateProduct(req, res, collection);
});

export { productRouter };
