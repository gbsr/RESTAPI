import express, { Router, Request, Response } from "express";
// import { Product, addProduct, products } from "./data/products.js";

export const router: Router = express.Router();

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

/**
 * The function `listProducts` takes an array of products and logs each product's name and ID to the
 * console.
 * @param {any[]} products - An array containing products, where each product is an object with
 * properties "id" and "name".
 */
function listProducts(products: any[]) {
	products.forEach((product: { id: any; name: any }) => {
		console.log("Product: ", product.name);
		console.log("ProductID: ", product.id);
	});
}

/* This code snippet is defining a GET endpoint that is accessed when the base URL path is requested.
In this case, when a GET request is made to the base URL path, the server will execute the
`listProducts` function to display all products and then send the list of products back as a
response. This endpoint is typically used to retrieve a list of resources, in this case, a list of
products, from the server. */

// '/products' is in server.ts:   (''/products' + '/')
// router.get("/", (req: Request, res: Response) => {
// 	listProducts(products);
// 	res.send(products);
// });

/* This code snippet is defining a GET endpoint that expects a parameter `id` in the URL path. When a
GET request is made to this endpoint with a specific `id`, the server will attempt to retrieve a
product from the `products` array based on the provided `id`.
*/
// router.get("/:id", (req: Request<IdParam>, res: Response) => {
// 	const id: number = Number(req.params.id);
// 	console.log(`Received request for product id: ${req.params.id}`);

// 	// if id is not valid
// 	if (isNaN(id) || id < 0) {
// 		res.sendStatus(400);
// 		return;
// 	}

// 	// This code snippet is handling a GET request to retrieve a specific product by its ID.
// 	const found: Product | undefined = products.find(
// 		(product) => product.id === id
// 	);
// 	if (found) {
// 		res.send(found);
// 	} else {
// 		res.sendStatus(404);
// 	}
// });

// TODO: More robust validation using joi?
// add product
/* This code snippet is defining a POST endpoint for adding a new product. When a POST request is made
to this endpoint, it expects a new product object in the request body. */
// router.post("/", (req: Request, res: Response) => {
// 	const newProduct: Product = req.body;
// 	const product = addProduct(newProduct);
// 	if (!validProduct(newProduct)) {
// 		res.sendStatus(400);
// 		return;
// 	}
// 	res.sendStatus(201);
// 	console.log(product);
// });

/* This code snippet is defining a PUT endpoint for updating a product by its ID. When a PUT request is
made to this endpoint with a specific product ID, the server will attempt to update the product with
the provided data in the request body. */
// router.put("/:id", (req: Request, res: Response) => {
// 	const id = Number(req.params.id);
// 	const updatedTool = req.body;
// 	products[id] = updatedTool;
// 	res.send(products);
// });

// /* The code snippet `router.delete("/:id", (req: Request, res: Response) => { ... }` is defining a
// DELETE endpoint for removing a product based on its ID. */
// router.delete("/:id", (req: Request, res: Response) => {
// 	const id = Number(req.params.id);
// 	products.splice(id, 1);
// 	res.send(products);
// });

// TODO: -Add proper endpoints based on documentation details.
