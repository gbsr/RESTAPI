const getAllProductsBtn = document.querySelector('#get-products');
const searchProductsBtn = document.querySelector('#search-products');
const productList = document.querySelector('.product-list');

/**
 * Renders a list of products to the product list element.
 * Clears the existing list and checks if the provided products array is empty or undefined.
 * If there are no products, it displays a message indicating no products were found.
 * Otherwise, it iterates through each product and creates a list item displaying
 * the product name, price, and image.
 *
 * @param {Array} products - The array of product objects to be rendered.
 * Each product object is expected to have:
 * - name: string
 * - price: number
 * - image: string (URL of the product image)
 */
function renderProducts(products) {
    productList.innerHTML = ''; // Clear existing list
    if (!products || products.length === 0) {
        productList.innerHTML = '<li>No products found. Are you sure you entered the right search term?</li>';
        return;
    }
    products.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="container">
                <h2>${item.name}</h2>
                <p class="poppins-regular">${item.price} SEK</p>
            </div>
            <div class="imgContainer">
                <img src="${item.image}" alt="${item.name}"/>
            </div>`;
        productList.append(li);
    });
}

/**
 * Event handler for the click event on the "getAllProductsBtn" button.
 * This function fetches all products from the server using a GET request,
 * processes the received JSON data, and then renders the products to the UI.
 *
 * It includes error handling to log any issues that occur during the fetch process.
 */
getAllProductsBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/products', { method: 'GET' });
        const data = await response.json();
        console.log('All products from server: ', data);
        renderProducts(data.products);
    } catch (error) {
        console.error('Error fetching all products:', error);
    }
});

/**
 * Event listener for the search products button click.
 * Prompts the user to enter a product name to search for.
 * If a search term is provided, it fetches products from the server.
 * Logs the search results and displays them using the `renderProducts` function.
 * If an error occurs during the fetch operation, it logs the error
 * and alerts the user of the failure.
 */
searchProductsBtn.addEventListener('click', async () => {
    const searchTerm = prompt('Enter a product name to search:');
    if (searchTerm) {
        try {
            // TODO: handle edgecases such as spaces, special characters, etc.

            // Fetches product data based on the provided search term. The search term is appended to the URL as a query parameter.
            const response = await fetch(`/products/search?q=${(searchTerm)}`, { method: 'GET' });
            const data = await response.json();
            console.log('Search results from server: ', data);
            if (data.message) {
                alert(data.message);
            } else {
                renderProducts(data);
            }
        } catch (error) {
            console.error('Error searching products:', error);
            alert('An error occurred while searching for products');
        }
    }
});