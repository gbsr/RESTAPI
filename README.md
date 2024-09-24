# Product API

This is a **Product Management API** built with **Node.js** and **Express**, following RESTful principles. It includes basic CRUD operations for managing products and validates input using `Joi`. This project is part of a tech stack that includes **MongoDB**, **Express**, **Node.js**, and **React** (commonly referred to as the **MERN** stack).

Documented with [https://writer.mintlify.com/](Mintlify Document Writer)

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Installation](#installation)
-   [API Endpoints](#api-endpoints)
    -   [GET /](#get) Gets server
        -   [Products](#products)
            -   [GET /products](#get-products)
            -   [GET /products/:id](#get-productsid)
            -   [POST /products](#post-products)
            -   [PUT /products/:id](#put-productsid)
            -   [DELETE /products/:id](#delete-productsid)
        -   [Users](#users)
            To be implemented
        -   [Cart](#cart)
            To be implemented
-   [Error Handling](#error-handling)
-   [HTTP Status Codes](#http-status-codes)
-   [License](#license)

## Features

-   **CRUD Operations**: Create, Read, Update, and Delete products.
-   **Validation**: Validates product data using `Joi`.
-   **REST API**: Follows RESTful standards for better scalability and maintainability.

## Tech Stack

-   **MongoDB** (to be integrated for data persistence)
-   **Express.js** – Web framework for Node.js.
-   **Node.js** – JavaScript runtime environment.
-   **React** (future implementation for the frontend).

## Contributors

-   [Alina Ericson](https://github.com/wanderingkitty)
-   [Anders Hofsten](https://github.com/gbsr)
-   [Wilma Niklasson](https://github.com/wilmaniklasson)

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/product-api.git
cd product-api
```

Install dependencies:

```bash
npm install
```

Make sure you have an .env file in your project root:

```
CONNECTION_STRING=mongodb+srv://<userName>:<password>@golden-zombies.a3k0f.mongodb.net/
MONGODB_DB_NAME=products-api
PORT=1338
```

Replace `<userName> and <password> with your MongoDb username and password.`

Start the development server:

```bash
npm run server
```

The server will be live on `http://localhost:1338`.
Check package.json for other scripts, such as clean, build and so on.

## API Endpoints

### GET `/`

Retrieve the server root.

```bash
GET /
```

-   **Response**: Returns server root (status code ok: 200)

---

### GET `/products`

Retrieve the list of all products.

```bash
GET /products
```

-   **Response**: Returns an array of products.

---

### GET `/products/:id (to be implemented)`

Retrieve a specific product by its `id`.

```bash
GET /products/:id
```

-   **Path Parameter**: `id` (number) – The ID of the product.
-   **Response**: Returns the product if found, else a 404 status code.

---

### POST `/products (to be implemented)`

Add a new product.

```bash
POST /products
```

-   **Request Body**: JSON object representing a product.

    Example:

    ```json
    {
    	"name": "Product Name",
    	"price": 100,
    	"category": "Category"
    }
    ```

-   **Response**: Returns 201 status code on successful creation, or 400 for validation errors.

---

### PUT `/products/:id (to be implemented)`

Update an existing product by its `id`.

```bash
PUT /products/:id
```

-   **Path Parameter**: `id` (number) – The ID of the product.
-   **Request Body**: JSON object with updated product details.
-   **Response**: Returns the updated product list.

---

### DELETE `/products/:id (to be implemented)`

Delete a product by its `id`.

```bash
DELETE /products/:id
```

-   **Path Parameter**: `id` (number) – The ID of the product.
-   **Response**: Returns the updated list of products after deletion.

## Error Handling

The API uses appropriate HTTP status codes to indicate the result of each request:

-   `400 Bad Request`: Invalid request or validation failed.
-   `404 Not Found`: The requested product does not exist.
-   `500 Internal Server Error`: Something went wrong on the server.

Inside the helpers directory, there is a file called betterConsoleLog which can be used to log detailed messages to the console.
This file has some extra functions:
`logWithLocation(message: string, level: string)`

-   The function `logWithLocation` logs a message with location information such as file name and line
-   number.
-   @param {string} message - The `message` parameter is a string that represents the log message you
    want to output along with its location information.
-   @param {string} level - The `level` parameter in the `logWithLocation` function is used to specify the log level of the message being logged. It can be a string indicating the severity or importance of the log message, such as "info", "warning", "error", etc.

`logPerformance(label: string, fn: () => any): any`

-   The `logPerformance` function logs the time taken for a given function to execute and returns the result of the function.
-   @param {string} label - The `label` parameter is a string that represents a description or name for the performance measurement being logged.
-   @param fn - A function that you want to measure the performance of.
-   @returns The `logPerformance` function is returning the result of the function `fn` that was passed as a parameter.
-   Example use:
    const result = logPerformance('Heavy computation', () => {
    // Your heavy computation here
    return someResult;

## HTTP Status Codes

The API follows standard HTTP status codes for successful and failed responses:

-   **200 OK**: Successful GET request.
-   **201 Created**: Successfully created a resource (e.g., new product).
-   **204 No Content**: Successful request but no content to return.
-   **400 Bad Request**: Validation error or malformed request.
-   **404 Not Found**: Resource not found.
-   **500 Internal Server Error**: A server error occurred.

## License

This project is licensed under the MIT License.
