import express, { Router, Request, Response } from "express";
import { Product, addProduct, products } from "./data/tools.js";
import { isProductValid as validProduct } from "../validation.js";

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

function listProducts(products: any[]) {
	products.forEach((product: { id: any; name: any }) => {
		console.log("Product: ", product.name);
		console.log("ProductID: ", product.id);
	});
}

// go directly to endpoints (config in server.ts)
// '/products' is in server.ts:   (''/products' + '/')
router.get("/", (req: Request, res: Response) => {
	listProducts(products);
	res.send(products);
});

router.get("/:id", (req: Request<IdParam>, res: Response) => {
	const id: number = Number(req.params.id);
	console.log(`Received request for product id: ${req.params.id}`);

	// if id is not valid
	if (isNaN(id) || id < 0) {
		res.sendStatus(400);
		return;
	}

	// Find product by id
	const found: Product | undefined = products.find(
		(product) => product.id === id
	);
	if (found) {
		res.send(found);
	} else {
		res.sendStatus(404);
	}
});

// TODO: More robust validation using joi?
// add product
router.post("/", (req: Request, res: Response) => {
	const newProduct: Product = req.body;
	const product = addProduct(newProduct);
	if (!validProduct(newProduct)) {
		res.sendStatus(400);
		return;
	}
	res.sendStatus(201);
	console.log(product);
});

router.put("/:id", (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const updatedTool = req.body;
	products[id] = updatedTool;
	res.send(products);
});

router.delete("/:id", (req: Request, res: Response) => {
	const id = Number(req.params.id);
	products.splice(id, 1);
	res.send(products);
});

// TODO: -Add proper endpoints, check documentation for details
// GET /products
// POST /products
// DELETE /products/:id
// PUT /products/:id
