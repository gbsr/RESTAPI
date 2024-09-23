// Existing Product interface
export interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
}

// New interface for products without ID
export interface NewProduct {
	name: string;
	price: number;
	category: string;
}

export const products: Product[] = [
	{ id: 1, name: "Hammare", price: 199, category: "Slagverktyg" },
	{ id: 2, name: "Skruvmejsel", price: 79, category: "Handverktyg" },
	{ id: 3, name: "Tång", price: 129, category: "Handverktyg" },
	{ id: 4, name: "Såg", price: 249, category: "Skärverktyg" },
];

function generateId(): number {
	let max = 0;
	for (const product of products) {
		if (product.id > max) {
			max = product.id;
		}
	}
	return max + 1;
}

export function addProduct(newProduct: NewProduct): Product {
	const id = generateId();
	const product: Product = { id, ...newProduct };
	products.push(product);
	return product;
}
