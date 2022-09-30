main ()

async function main(){
    const Products = await getProducts()
    console.log(Products)
    for (let i = 0; i < Products.length; i++) {
        const Product = Products[i]
        displayProducts(Product)
    }
}

function getProducts() {
    return fetch("http://localhost:3000/api/products")
        .then(function(Response){
            return Response.json()
        })
        .then(function(Products){
            return Products
        })
        .catch(function(error) {
            alert(error)
        })
}

function displayProducts (Product) {
    document.getElementById("items").innerHTML  += `
    <a href="./product.html?id=${Product._id}">
        <article>
            <img src="${Product.imageUrl}" alt="${Product.altTxt}">
            <h3 class="productName">${Product.name}</h3>
            <p class="productDescription">${Product.description}</p>
        </article>
    </a>`
}