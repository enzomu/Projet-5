main()

async function main() {
    const ProductId = getProductId()
    const Product = await getProduct(ProductId)
    console.log(Product)
    displayProduct(Product)
}

function getProductId(){
    return new URL(location.href).searchParams.get("id")

}

function getProduct(ProductId) {
    return fetch(`http://localhost:3000/api/products/${ProductId}`)
        .then(function(Response){
            return Response.json()
        })
        .then(function(Products){
            return Products
        })

}

function displayProduct(Product) {
    document.getElementsByClassName("item__img").innerHTML = `
    <img src="${Product.imageUrl}" alt="${Product.altTxt}">
    `
    document.getElementById("title").innerHTML =`
    ${Product.name}
    `
    document.getElementById("price").innerHTML =`
    ${Product.price}
    `
    document.getElementById("description").innerHTML =`
    ${Product.description}
    `
    for (let i = 0; i < Product.colors.length; i++){
    const color = Product.colors[i]
    document.getElementById("colors").innerHTML +=`
    <option value="color">${Product.colors[i]}</option>
    `
    }
}