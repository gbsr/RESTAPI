const fs = require('fs');

// Generate 20 product entries
/*This code snippet is generating an array of 20 product entries. 
It uses `Array.from()` to create an array with a length of 20 and then fills it with objects using the callback function provided as the second argument.
*/

const products = Array.from({ length: 20 }, (_, i) => ({
    name: `Product ${i + 1}`,
    price: (i + 1) * 10,
    category: `Category ${i % 2 === 0 ? 'A' : 'B'}`,
    description: `This is a description for Product ${i + 1}`,
    inStock: i % 2 === 0, // alternating between true and false
    rating: (i % 2 === 0 ? 4.0 : 3.5), // alternating rating between 4.0 and 3.5
    createdAt: "2023-09-23T12:00:00Z",
    imgUrl: ""
}));

// Write the product data to a JSON file
fs.writeFile('../data/mockdata.json', JSON.stringify(products, null, 4), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('products.json file created successfully.');
    }
});