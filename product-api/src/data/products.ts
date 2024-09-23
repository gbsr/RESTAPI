import productsData from "../data/mockdata.json";

// Convert the imported data to the Product type
export const products: Product[] = productsData as Product[];

export interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
	description: string;
	inStock: boolean;
	rating: number;
	createdAt: string;
	imgUrl: string;
}

// New interface for products without ID
export interface NewProduct {
	name: string;
	price: number;
	category: string;
	description: string;
	inStock: boolean;
	rating: number;
	createdAt: string;
	imgUrl: string;
}

/**
 * The function generates a new unique ID for a product by finding the maximum existing ID and
 * incrementing it by 1.
 * @returns The function `generateId` returns the next available ID for a new product by finding the
 * maximum ID currently in the `products` array and incrementing it by 1.
 */
function generateId(): number {
	let max = 0;
	for (const product of products) {
		if (product.id > max) {
			max = product.id;
		}
	}
	return max + 1;
}

/**
 * The function `addProduct` adds a new product to a list of products and returns the added product.
 * @param {NewProduct} newProduct - `newProduct` is an object representing a new product that will be
 * added to the list of products. It likely contains properties such as `name`, `price`, `description`,
 * etc.
 * @returns The function `addProduct` is returning the newly added product with its generated ID.
 */
export function addProduct(newProduct: NewProduct): Product {
	const id = generateId();
	const product: Product = { id, ...newProduct };
	products.push(product);
	return product;
}
