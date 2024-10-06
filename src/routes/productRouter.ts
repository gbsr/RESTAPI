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
import { searchProducts } from "../crud/search/searchProducts.js";

/**
 * Defines the routes and middleware for handling product-related HTTP requests.
 *
 * Middleware to initialize the product collection before processing requests.
 *
 * Routes:
 * - GET /search: Searches for products based on query parameters.
 * - GET /:id: Retrieves a specific product by its ID.
 * - GET /: The root route retrieves all products.
 * - POST /post: Adds a new product to the collection.
 * - DELETE /:id: Deletes a specific product by its ID.
 * - PUT /:id: Updates an existing product by its ID.
 *
 * All routes make use of the passed collection of products.
 */
const productRouter = Router();
let collection: Collection<Product>;

productRouter.use((req: Request, res: Response, next) => {
	collection = db.collection<Product>("products");
	next();
});

// Search product request query
productRouter.get("/search", async (req: Request, res: Response) => {
	await searchProducts(req, res, collection);
});

productRouter.get("/", async (req: Request, res: Response) => {
	await getAllProducts(req, res, collection);
});

productRouter.get("/:id", async (req: Request, res: Response) => {
	const id = new ObjectId();
	await getProduct(req, res, collection, id);
});

productRouter.post("/post", async (req: Request, res: Response) => {
	await addProduct(req, res, collection);
});

productRouter.delete("/:id", async (req: Request, res: Response) => {
	await deleteProduct(req, res, collection);
});

productRouter.put("/:id", async (req: Request, res: Response) => {
	await updateProduct(req, res, collection);
});

export { productRouter };
