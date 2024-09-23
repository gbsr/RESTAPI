import express from "express";
import { addProduct, products } from "./data/tools.js";
export const router = express.Router();
function listProducts(products) {
    products.forEach((product) => {
        console.log("Product: ", product.name);
        console.log("ProductID: ", product.id);
    });
}
// Gå direkt till endpoints (konfigurationen görs i server.ts)
// OBS! '/products' står i server.ts  (''/products' + '/')
router.get("/", (req, res) => {
    listProducts(products);
    res.send(products);
});
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log(`Received request for product id: ${req.params.id}`);
    // if id is not valid
    if (isNaN(id) || id < 0) {
        res.sendStatus(400);
        return;
    }
    // TODO: Find product by id
    const found = products.find((product) => product.id === id);
    if (found) {
        res.send(found);
    }
    else {
        res.sendStatus(404);
    }
});
// TODO: Validate tool to make sure it's correct object
// TODO: check if tool already exists
router.post("/", (req, res) => {
    const newProduct = req.body;
    const product = addProduct(newProduct);
    console.log(product);
    res.sendStatus(201);
});
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const updatedTool = req.body;
    products[id] = updatedTool;
    res.send(products);
});
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    products.splice(id, 1);
    res.send(products);
});
// TODO:
// POST /products  <- lägga till en ny produkt, ha med BODY
// DELETE /products/:id  <- ta bort produkt baserat på id-parametern
// PUT /products/:id  <- ha med BODY
