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

import express, { Express, NextFunction, Request, Response } from "express";
import { router } from "./handleProducts.js";
const app: Express = express();
const port = 1338;

// Middleware
app.use(express.json()); // put stuff in body

app.use("/", (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method}  ${req.url} `, req.body);
	next();
});

// Endpoints - imported from separate files
app.use("/products", router);
app.use("/cart", router);
app.use("/users", router);

// start server
app.listen(port, () => {
	console.log("Product API server is online on port " + port);
});
