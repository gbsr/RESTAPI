import express, { Router, Request, Response } from "express";
// import { Product, addProduct, products } from "./data/products.js";

export const productRouter: Router = express.Router();

interface IdParam {
	id: string;
}

// https://restfulapi.net/http-status-codes/
/**
 * Common HTTP Status Codes for REST API Design
 *
 * 2xx Success:
 * 200 OK - The request has succeeded
 * 201 Created - The request has been fulfilled and a new resource has been created
 * 204 No Content - The request has succeeded, but there's no content to send back
 *
 * 3xx Redirection:
 * 301 Moved Permanently - The requested resource has been permanently moved
 * 304 Not Modified - The resource hasn't been modified since the last request
 *
 * 4xx Client Errors:
 * 400 Bad Request - The server cannot process the request due to client error
 * 401 Unauthorized - Authentication is required and has failed or not been provided
 * 403 Forbidden - The server understood the request but refuses to authorize it
 * 404 Not Found - The requested resource could not be found
 * 405 Method Not Allowed - The request method is not supported for the requested resource
 * 409 Conflict - The request conflicts with the current state of the server
 *
 * 5xx Server Errors:
 * 500 Internal Server Error - A generic error message when an unexpected condition was encountered
 * 502 Bad Gateway - The server received an invalid response from the upstream server
 * 503 Service Unavailable - The server is currently unable to handle the request
 */

function listProducts(products: any[]) {
	products.forEach((product: { id: any; name: any }) => {
		console.log("Product: ", product.name);
		console.log("ProductID: ", product.id);
	});
}

// '/products' is in server.ts:   (''/products' + '/')
// productRouter.get("/", (req: Request, res: Response) => {
// 	listProducts(products);
// 	res.send(products);
// });

// productRouter.get("/:id", (req: Request, res: Response) => {
// 	const product = products.find((p: Product) => p._id: );
// 	if (product) {
// 		res.send(product);
// 	}
// TODO: More robust validation using joi?
// add product
/* This code snippet is defining a POST endpoint for adding a new product. When a POST request is made
to this endpoint, it expects a new product object in the request body. */
// productRouter.post("/", (req: Request, res: Response) => {
// 	const newProduct: Product = req.body;
// 	const product = addProduct(newProduct);
// 	if (!validProduct(newProduct)) {
// 		res.sendStatus(400);
// 		return;
// 	}
// 	res.sendStatus(201);
// 	console.log(product);
// });

// /* This code snippet is defining a PUT endpoint for updating a product by its ID. When a PUT request is
// made to this endpoint with a specific product ID, the server will attempt to update the product with
// the provided data in the request body. */
// productRouter.put("/:id", (req: Request, res: Response) => {
// 	const id = Number(req.params.id);
// 	const updatedTool = req.body;
// 	products[id] = updatedTool;
// 	res.send(products);
// });

// /* The code snippet `router.delete("/:id", (req: Request, res: Response) => { ... }` is defining a
// DELETE endpoint for removing a product based on its ID. */
// productRouter.delete("/:id", (req: Request, res: Response) => {
// 	const id = Number(req.params.id);
// 	products.splice(id, 1);
// 	res.send(products);
// });

// TODO: -Add proper endpoints based on documentation details.
