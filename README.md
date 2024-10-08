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

### Products API

This section documents the API endpoints related to products.

---

### GET `/products`

Retrieve the list of all products.

```bash
GET /products
```

- **Response**: Returns an array of products.

**Example Response**:

```json
[
  {
    "_id": "66f28c753953d47e966446f5",
    "name": "Bluetooth Speaker",
    "price": 699,
    "image": "https://wilmaniklasson.github.io/Bilder-grupparbete/img/Bluetooth%20Speaker.webp",
    "amountInStock": 45
  },
  {
    "_id": "66f28c753953d47e966446f6",
    "name": "Wireless Headphones",
    "price": 499,
    "image": "https://example.com/wireless-headphones.webp",
    "amountInStock": 20
  }
]
```

---

### GET `/products/{id}`

Retrieve a specific product by its `id`.

```bash
GET /products/{id}
```

- **Path Parameter**: `id` (string) – The ID of the product (an `ObjectId` from MongoDB).
- **Response**: Returns the product if found, else a 404 status code.

**Example Response**:

```json
{
  "_id": "66f28c753953d47e966446f5", // ObjectId returned as a string
  "name": "Bluetooth Speaker",
  "price": 699,
  "image": "https://wilmaniklasson.github.io/Bilder-grupparbete/img/Bluetooth%20Speaker.webp",
  "amountInStock": 45
}
```

**Error Response** (if product not found):

```json
{
  "message": "Product not found"
}
```

---

### POST `/products`

Add a new product.

```bash
POST /products
```

- **Request Body**: JSON object representing a product.

**Example Request Body**:

```json
{
  "name": "New Product Name",
  "price": 299,
  "image": "https://example.com/new-product-image.webp",
  "amountInStock": 100
}
```

- **Response**: Returns 201 status code on successful creation, or 400 for validation errors.

---

### PUT `/products/{id}`

Update an existing product by its `id`.

```bash
PUT /products/{id}
```

- **Path Parameter**: `id` (string) – The ID of the product (an `ObjectId` from MongoDB).
- **Request Body**: JSON object with updated product details.

**Example Request Body**:

```json
{
  "name": "Bluetooth Speaker",
  "price": 799,
  "image": "https://wilmaniklasson.github.io/Bilder-grupparbete/img/Bluetooth%20Speaker.webp",
  "amountInStock": 30
}
```

- **Response**: Returns the updated product.

**Example Response**:

```json
{
  "message": "Product updated successfully",
  "updatedProduct": {
    "_id": "66f28c753953d47e966446f5",
    "name": "Bluetooth Speaker",
    "price": 799,
    "image": "https://wilmaniklasson.github.io/Bilder-grupparbete/img/Bluetooth%20Speaker.webp",
    "amountInStock": 30
  }
}
```

---

### DELETE `/products/{id}`

Delete a product by its `id`.

```bash
DELETE /products/{id}
```

- **Path Parameter**: `id` (string) – The ID of the product (an `ObjectId` from MongoDB).
- **Response**: Returns a message confirming the deletion of the product.

**Example Response**:

```json
{
  "message": "Product deleted successfully",
  "productId": "66f28c753953d47e966446f5"
}
```

---

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

**Example Response** (when products are found):

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

**Example Response** (when no products are found):

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

### GET `/users`

Retrieve the list of all users.

```bash
GET /users
```

- **Response**: Returns an array of users, where each `id` is returned as a string representing the `ObjectId`.

**Example Response**:

```json
[
  {
    "_id": "66f288110f48fe183bc22d74", // ObjectId returned as a string
    "name": "Emma Johnson",
    "isAdmin": false
  },
  {
    "_id": "66f288110f48fe183bc22d75", // ObjectId returned as a string
    "name": "John Doe",
    "isAdmin": true
  }
]
```

---

### GET `/users/id`

Retrieve a specific user by its `id`.

```bash
GET /users/id
```

- **Path Parameter**: `id` (string) – The `ObjectId` of the user, returned as a string.
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
    "name": "Emma Johnson",
    "isAdmin": false
  }
  ```

- **Response**: Returns 201 status code on successful creation, including the new user’s `ObjectId` as a string.

**Example Response**:

```json
{
  "_id": "66f288110f48fe183bc22d76", // ObjectId returned as a string
  "name": "Emma Johnson",
  "isAdmin": false
}
```

---

### PUT `/users/id`

Update an existing user by its `id`.

```bash
PUT /users/id
```

- **Path Parameter**: `id` (string) – The `ObjectId` of the user, returned as a string.
- **Request Body**: JSON object with updated user details.
- **Response**: Returns the updated user’s information, with `ObjectId` as a string.

---

### DELETE `/users/id`

Delete a user by its `id`.

```bash
DELETE /users/id
```

- **Path Parameter**: `id` (string) – The `ObjectId` of the user, returned as a string.
- **Response**: Returns a message confirming the user deletion.

**Example Response**:

```json
{
  "message": "User deleted",
  "userId": "66f288110f48fe183bc22d76" // ObjectId returned as a string
}
```

---

### GET `/users/search`

Search for users by name using a query string.

- **Query Parameter**:

  - `q` (string) - The search term used to find users by their name.

- **Response**:
  - Returns an array of matching users, where each `id` is returned as a string representing the `ObjectId`.
  - If no users match the search criteria, an empty array is returned.
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
    "_id": "66f288110f48fe183bc22d74", // ObjectId returned as a string
    "name": "Emma Johnson",
    "isAdmin": false
  }
]
```

---

### GET `/cart`

Retrieve the list of all carts.

```bash
GET /cart
```

- **Response**: Returns an array of carts, where the `userId`, `productId`, and `_id` fields are all `ObjectId` values returned as strings from MongoDB.

**Example Response**:

```json
[
  {
    "_id": "66f41ba4848b2c46fe6ab3f1", // MongoDB ObjectId as a string
    "userId": "66f3dac2899e4901bfca8e91", // MongoDB ObjectId as a string
    "productId": "66f28c753953d47e966446fd", // MongoDB ObjectId as a string
    "amount": 3
  },
  {
    "_id": "66f41c0c848b2c46fe6ab3f2",
    "userId": "66f3dac2899e4901bfca8e91",
    "productId": "66f28c753953d47e966446fe",
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

- **Path Parameter**: `userId` (string) – The `ObjectId` of the user, returned as a string.
- **Response**: Returns the cart of the user if found, else a 404 status code.

**Example Response**:

```json
[
  {
    "_id": "66f41ca2848b2c46fe6ab3f4", // MongoDB ObjectId as a string
    "userId": "66f3daf29ae1b485624b0861", // MongoDB ObjectId as a string
    "productId": "66f28c753953d47e96644700", // MongoDB ObjectId as a string
    "amount": 1
  }
]
```

---

### POST `/cart/add/{userId}/{productId}`

Add a new product to a user's cart.

```bash
POST /cart/add/{userId}/{productId}
```

- **Path Parameter**: `userId` (string) – The `ObjectId` of the user, returned as a string.
- **Path Parameter**: `productId` (string) – The `ObjectId` of the product, returned as a string.
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
    "userId": "66f3daf29ae1b485624b0861", // MongoDB ObjectId as a string
    "productId": "66f28c753953d47e966446fb", // MongoDB ObjectId as a string
    "amount": 1,
    "_id": "6703f6469403b0386e972945" // MongoDB ObjectId as a string
  }
}
```

---

### PUT `/cart/update/{userId}/{productId}`

Update the quantity of a product in the user's cart by its `userId` and `productId`.

```bash
PUT /cart/update/{userId}/{productId}
```

- **Path Parameter**: `userId` (string) – The `ObjectId` of the user, returned as a string.
- **Path Parameter**: `productId` (string) – The `ObjectId` of the product, returned as a string.
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
  "productId": "66f28c753953d47e966446fb", // MongoDB ObjectId as a string
  "updatedAmount": 10
}
```

---

### DELETE `/cart/delete/{userId}/{productId}`

Delete a product from the user's cart by its `userId` and `productId`.

```bash
DELETE /cart/delete/{userId}/{productId}
```

- **Path Parameter**: `userId` (string) – The `ObjectId` of the user, returned as a string.
- **Path Parameter**: `productId` (string) – The `ObjectId` of the product, returned as a string.
- **Response**: Returns a message confirming the deletion of the product.

**Example Response**:

```json
{
  "message": "Product deleted from cart",
  "productId": "66f28c753953d47e966446fb" // MongoDB ObjectId as a string
}
```

---

## Error Handling

The API uses appropriate HTTP status codes to indicate the result of each request:

- **400 Bad Request**: Indicates that the request is invalid or a validation error has occurred.
- **404 Not Found**: Indicates that the requested resource (e.g., product or user) does not exist.
- **500 Internal Server Error**: Indicates that an unexpected error occurred on the server.

Within the **helpers** directory, there is a file named `betterConsoleLog`, which provides utility functions for logging detailed messages to the console. This file includes the following functions:

### `logWithLocation(message: string, level: string)`

- Logs a message along with location information, such as the file name and line number.
- **@param {string} message**: A string representing the log message to output, along with its location information.
- **@param {string} level**: A string specifying the log level of the message (e.g., "info", "warning", "error").

### `logPerformance(label: string, fn: () => any): any`

- Logs the execution time of a given function and returns the result of that function.
- **@param {string} label**: A string representing a description or name for the performance measurement being logged.
- **@param fn**: A function whose performance you want to measure.
- **@returns**: Returns the result of the function `fn` that was passed as a parameter.

**Example usage**:

```javascript
const result = logPerformance("Heavy computation", () => {
  // Your heavy computation here
  return someResult;
});
```

---

## HTTP Status Codes

The API adheres to standard HTTP status codes for successful and failed responses:

- **200 OK**: Successful GET request.
- **201 Created**: Successfully created a resource (e.g., a new product).
- **204 No Content**: Successful request, but no content to return.
- **400 Bad Request**: Indicates a validation error or malformed request.
- **404 Not Found**: Indicates that the requested resource was not found.
- **500 Internal Server Error**: Indicates that a server error occurred.

## License

This project is licensed under the MIT License.

---
