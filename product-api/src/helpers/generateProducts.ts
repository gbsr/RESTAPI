import { logWithLocation } from "./betterConsoleLog.js";
import fs from "fs";
import path from "path";

// Generate 20 product entries
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
					`Mock data written to file: ${absoluteOutputPath}`
				);
			}
		}
	);
}
// jump out of the dist folder and write it in the src folder
writeProductsToFile("../../../src/data/mockdata.json");
