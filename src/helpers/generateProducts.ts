import { logWithLocation } from "./betterConsoleLog.js";
import fs from "fs";
import path from "path";

// Generates an array of product objects with properties like name, price, category, description,
// inStock status, rating, creation date, and image URL. Each product object is populated based
// on its index in the array, creating a total of 20 products with alternating categories and
// stock availability.
const products = Array.from({ length: 20 }, (_, i) => ({
	name: `Product ${i + 1}`,
	price: (i + 1) * 10,
	category: `Category ${i % 2 === 0 ? "A" : "B"}`,
	description: `This is a description for Product ${i + 1}`,
	inStock: i % 2 === 0,
	rating: i % 2 === 0 ? 4.0 : 3.5,
	createdAt: "2023-09-23T12:00:00Z",
	imgUrl: "",
}));

// Function to write products to a file
/**
 * Writes product data to a specified file.
 *
 * @param {string} outputPath - The path where the file should be written.
 * The function resolves this path to an absolute path.
 *
 * The function attempts to write the JSON string of the products
 * to the file and handles any potential errors by logging them
 * to the console. If the write operation is successful, a success
 * message is logged with the location of the written file.
 */
function writeProductsToFile(outputPath: string) {
	const absoluteOutputPath = path.resolve(outputPath);

	fs.writeFile(
		absoluteOutputPath,
		JSON.stringify(products, null, 4),
		(err) => {
			if (err) {
				console.error("Error writing file:", err);
			} else {
				logWithLocation(
					`Mock data written to file: ${absoluteOutputPath}`,
					"success"
				);
				console.log("");
			}
		}
	);
}
// jump out of the dist folder and write it in the src folder
writeProductsToFile("../../../src/data/mockdata.json");
