# Product API

This is a **Product Management API** built with **Node.js** and **Express**, following RESTful principles. It includes basic CRUD operations for managing products and validates input using `Joi`. This project is part of a tech stack that includes **MongoDB**, **Express**, **Node.js**, and **React** (commonly referred to as the **MERN** stack).

Documented with [https://writer.mintlify.com/](Mintlify Document Writer)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)

  - [GET /](#get) Gets server

  - [products](#products)

    - [GET /products](#get-products)
    - [GET /products/id](#get-productsid)
    - [POST /products](#post-products)
    - [PUT /products/id](#put-productsid)
    - [DELETE /products/id](#delete-productsid)
    - [GET /products/search](#get-productssearch)

  - [users](#users)

    - [GET /users](#get-users)
    - [GET /users/id](#get-usersid)
    - [POST /users](#post-users)
    - [PUT /users/id](#put-usersid)
    - [DELETE /users/id](#delete-usersid)
    - [GET /users/search](#get-userssearch)

  - [cart](#cart)
    - [GET /cart](#get-cart)
    - [GET /cart/user/{userId}](#get-cartuseruserid)
    - [POST /cart/add/{userId}/{productId}](#post-cartadduseridproductid)
    - [PUT /cart/update/{userId}/{productId}](#put-cartupdateuseridproductid)
    - [DELETE /cart/delete/userId/productId](#delete-cartdeleteuseridproductid)

- [Error Handling](#error-handling)
- [HTTP Status Codes](#http-status-codes)
- [License](#license)

## Features

- **CRUD Operations**: Create, Read, Update, and Delete products.
- **Validation**: Validates product data using `Joi`.
- **REST API**: Follows RESTful standards for better scalability and maintainability.

## Tech Stack

- **MongoDB** (to be integrated for data persistence)
- **Express.js** – Web framework for Node.js.
- **Node.js** – JavaScript runtime environment.
- **React** (future implementation for the frontend).

## Contributors

- [Alina Ericson](https://github.com/wanderingkitty)
- [Anders Hofsten](https://github.com/gbsr)
- [Wilma Niklasson](https://github.com/wilmaniklasson)

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

The server will be live on `http://localhost:1338` (or your port in .env then).
Check package.json for other scripts, such as clean, build and so on.

## API Endpoints

### GET `/`

Retrieve the server root.

```bash
GET /
```

- **Response**: Returns server root (status code ok: 200)

---

### GET `/products`

Retrieve the list of all products.

```bash
GET /products
```

- **Response**: Returns an array of products.

---

### GET `/products/id`

Retrieve a specific product by its `id`.

```bash
GET /products/id
```

- **Path Parameter**: `id` (number) – The ID of the product.
- **Response**: Returns the product if found, else a 404 status code.

---

### POST `/products (to be implemented)`

Add a new product.

```bash
POST /products
```

- **Request Body**: JSON object representing a product.

  Example:

  ```json
  {
    "name": "Product Name",
    "price": 100,
    "category": "Category"
  }
  ```

- **Response**: Returns 201 status code on successful creation, or 400 for validation errors.

---

### PUT `/products/id`

Update an existing product by its `id`.

```bash
PUT /products/id
```

- **Path Parameter**: `id` (number) – The ID of the product.
- **Request Body**: JSON object with updated product details.
- **Response**: Returns the updated product list.

---

### DELETE `/products/id`

Delete a product by its `id`.

```bash
DELETE /products/id
```

### GET `/products/search`

Search for products by name using a query string.

- **Query Parameter**:

  - `q` (string) - The search term used to find products by their name.

- **Response**:
  - Returns an array of matching products. If no products match the search criteria, an empty array is returned.
  - If the query parameter is missing, a 400 status code is returned with an error message.
  - If an internal server error occurs, a 500 status code is returned with an error message.

**Example Request**:

```bash
GET /products/search?q=Bluetooth
```

```json
[
  {
    "_id": "66f28c753953d47e966446f5",
    "name": "Bluetooth Speaker",
    "price": 699,
    "image": "https://wilmaniklasson.github.io/Bilder-grupparbete/img/Bluetooth%20Speaker.webp",
    "amountInStock": 45
  }
]
```

---

### GET `/users`

Retrieve the list of all users.

```bash
GET /users
```

- **Response**: Returns an array of users.

---

### GET `/users/id`

Retrieve a specific user by its `id`.

```bash
GET /users/id
```

- **Path Parameter**: `id` (number) – The ID of the user.
- **Response**: Returns the user if found, else a 404 status code.

---

### POST `/users`

Add a new user.

```bash
POST /users
```

- **Request Body**: JSON object representing a user.

  Example:

  ```json
  {
    "name": "Emma Johnson ",
    "isAdmin": false
  }
  ```

- **Response**: Returns 201 status code on successful creation, or 400 for validation errors.

---

### PUT `/users/id`

Update an existing user by its `id`.

```bash
PUT /users/id
```

- **Path Parameter**: `id` (number) – The ID of the user.
- **Request Body**: JSON object with updated user details.
- **Response**: Returns the updated user list.

---

### DELETE `/users/id`

Delete a user by its `id`.

```bash
DELETE /users/id
```

- **Path Parameter**: `id` (number) – The ID of the user.
- **Response**: Returns the updated list of users after deletion.

### GET `/users/search`

Search for users by name using a query string.

- **Query Parameter**:

  - `q` (string) - The search term used to find users by their name.

- **Response**:
  - Returns an array of matching users. If no users match the search criteria, an empty array is returned.
  - If the query parameter is missing, a 400 status code is returned with an error message.
  - If an internal server error occurs, a 500 status code is returned with an error message.

**Example Request**:

```bash
GET /users/search?q=Emma
```

**Example Response** (when users are found):

```json
[
  {
    "_id": "66f288110f48fe183bc22d74",
    "name": "Emma Johnson ",
    "isAdmin": false
  }
]
```

**Example Response** (when no users are found):

```json
[]
```

**Example Response** (when query parameter is missing):

```json
{
  "message": "Search query is required"
}
```

**Example Response** (on internal server error):

```json
{
  "message": "Internal server error"
}
```

---

### GET `/cart`

Retrieve the list of all carts.

```bash
GET /cart
```

- **Response**: Returns an array of carts.

**Example Response**:

```json
[
  {
    "_id": "66f41ba4848b2c46fe6ab3f1",
    "userId": "66f3dac2899e4901bfca8e91",
    "productId": "66f28c753953d47e966446fd",
    "amount": 3
  },
  {
    "_id": "66f41c0c848b2c46fe6ab3f2",
    "userId": "66f3dac2899e4901bfca8e91",
    "productId": "66f28c753953d47e966446fe",
    "amount": 1
  },
  {
    "_id": "66f41c4c848b2c46fe6ab3f3",
    "userId": "66f3dac2899e4901bfca8e91",
    "productId": "66f28c753953d47e966446ff",
    "amount": 1
  }
]
```

---

### GET `/cart/user/{userId}`

Retrieve a specific cart by its `userId`.

```bash
GET /cart/user/{userId}
```

- **Path Parameter**: `userId` (string) – The ID of the user.
- **Response**: Returns the cart of the user if found, else a 404 status code.

**Example Response**:

```json
[
  {
    "_id": "66f41ca2848b2c46fe6ab3f4",
    "userId": "66f3daf29ae1b485624b0861",
    "productId": "66f28c753953d47e96644700",
    "amount": 1
  },
  {
    "_id": "66f528737a8d54267ca417a8",
    "userId": "66f3daf29ae1b485624b0861",
    "productId": "66f28c753953d47e966446f3",
    "amount": 1
  },
  {
    "_id": "66faa1e894e5e5e856f0cf2d",
    "userId": "66f3daf29ae1b485624b0861",
    "productId": "66f28c753953d47e966446fb",
    "amount": 30
  }
]
```

---

### POST `/cart/add/{userId}/{productId}`

Add a new product to a user's cart.

```bash
POST /cart/add/{userId}/{productId}
```

- **Path Parameter**: `userId` (string) – The ID of the user.
- **Path Parameter**: `productId` (string) – The ID of the product.
- **Request Body**:
  ```json
  {
    "amount": 1
  }
  ```
- **Response**: Returns the new cart item, or a 404 status code if not successful.

**Example Response**:

```json
{
  "message": "Product added to cart",
  "newCartItem": {
    "userId": "66f3daf29ae1b485624b0861",
    "productId": "66f28c753953d47e966446fb",
    "amount": 1,
    "_id": "6703f5bdb9221183af84da5e"
  }
}
```

---

### PUT `/cart/update/{userId}/{productId}`

Update the quantity of a product in the user's cart by its `userId` and `productId`.

```bash
PUT /cart/update/{userId}/{productId}
```

- **Path Parameter**: `userId` (string) – The ID of the user.
- **Path Parameter**: `productId` (string) – The ID of the product.
- **Request Body**:
  ```json
  {
    "amount": 5
  }
  ```
- **Response**: Returns a message confirming the product quantity update.

**Example Response**:

```json
{
  "message": "Product quantity updated in cart",
  "productId": "66f28c753953d47e966446fb",
  "updatedAmount": 10
}
```

---

### DELETE `/cart/delete/userId/productId`

Delete a product from the user's cart by its `userId` and `productId`.

```bash
DELETE /cart/delete/{userId}/{productId}
```

- **Path Parameter**: `userId` (string) – The ID of the user.
- **Path Parameter**: `productId` (string) – The ID of the product.
- **Response**: Returns a message confirming the deletion of the product.

**Example Response**:

```json
{
  "message": "Product deleted from cart",
  "productId": "66f28c753953d47e966446fb"
}
```

---

## Error Handling

The API uses appropriate HTTP status codes to indicate the result of each request:

- `400 Bad Request`: Invalid request or validation failed.
- `404 Not Found`: The requested product does not exist.
- `500 Internal Server Error`: Something went wrong on the server.

Inside the helpers directory, there is a file called betterConsoleLog which can be used to log detailed messages to the console.
This file has some extra functions:
`logWithLocation(message: string, level: string)`

- The function `logWithLocation` logs a message with location information such as file name and line
- number.
- @param {string} message - The `message` parameter is a string that represents the log message you
  want to output along with its location information.
- @param {string} level - The `level` parameter in the `logWithLocation` function is used to specify the log level of the message being logged. It can be a string indicating the severity or importance of the log message, such as "info", "warning", "error", etc.

`logPerformance(label: string, fn: () => any): any`

- The `logPerformance` function logs the time taken for a given function to execute and returns the result of the function.
- @param {string} label - The `label` parameter is a string that represents a description or name for the performance measurement being logged.
- @param fn - A function that you want to measure the performance of.
- @returns The `logPerformance` function is returning the result of the function `fn` that was passed as a parameter.
- Example use:
  const result = logPerformance('Heavy computation', () => {
  // Your heavy computation here
  return someResult;

## HTTP Status Codes

The API follows standard HTTP status codes for successful and failed responses:

- **200 OK**: Successful GET request.
- **201 Created**: Successfully created a resource (e.g., new product).
- **204 No Content**: Successful request but no content to return.
- **400 Bad Request**: Validation error or malformed request.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: A server error occurred.

## License

This project is licensed under the MIT License.

```

```
