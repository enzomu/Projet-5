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
        .catch(function(error) {
            alert(error)
        })

}

//function displayProduct(Product) {
//    document.getElementsByClassName("item__img")[0].innerHTML = `
//    <img src="${Product.imageUrl}" alt="${Product.altTxt}">
//    `
//    document.getElementById("title").innerHTML =`
//    ${Product.name}
//    `
//    document.getElementById("price").innerHTML =`
//    ${Product.price}
//   `
//    document.getElementById("description").innerHTML =`
//    ${Product.description}
//    `
//    for (let i = 0; i < Product.colors.length; i++){
//    const color = Product.colors[i]
//    document.getElementById("colors").innerHTML +=`
//    <option value="color">${Product.colors[i]}</option>
//    `
//    }
//}

function displayProduct(Product) {

    const elt_img = document.createElement("img")
    elt_img.setAttribute("src", Product.imageUrl)
    elt_img.setAttribute("alt", Product.altTxt)

    document.getElementsByClassName("item__img")[0].appendChild(elt_img)

    const elt_h1 =  document.getElementById('title')
    elt_h1.textContent = Product.name

    const elt_description = document.getElementById("description")
    elt_description.textContent = Product.description

    const elt_select =  document.getElementById('colors')

    for (let color in Product.colors){
        const elt_option = document.createElement("option")
        elt_option.setAttribute("value", Product.colors[color])
        elt_option.textContent = Product.colors[color]
        elt_select.appendChild(elt_option)
    }

}