

// get-products

const button = document.querySelector('#get-products')
const ul = document.querySelector('.product-list')

button.addEventListener('click', async () => {
	// skicka "GET /products" request med fetch
	// loopa över listan
	// skapa li-element med produktinfo
	// lägg till <li> till <ul>

	const response = await fetch('/products', {
		method: 'GET'
	})
	const data = await response.json()
	console.log('Svar från servern: ', data)
	// [ {category, id, name, price} ]

	data.products.forEach(item => {
		const li = document.createElement('li')
		li.innerHTML = ` 
		<div class="container">
		<h2>${item.name}</h2>
		<p class="poppins-regular"> ${item.price} SEK </p>
		</div>
		<div class="imgContainer">
		<img src="${item.image}" alt="${item.image}"/></div>`
		ul.append(li)
		
	})

})

