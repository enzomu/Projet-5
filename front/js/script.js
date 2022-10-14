main ()

async function main(){
    const Products = await getProducts()
    console.log(Products)
    for (let Product of Products) {
        displayProducts(Product)
    }
}

async function getProducts() {
    try {
        const Response = await fetch("http://localhost:3000/api/products")
        const Products = await Response.json()
        return Products
    } catch (error) {
        alert(error)
    }
}

//function displayProducts (Product) {
//    document.getElementById("items").innerHTML  += `
//    <a href="./product.html?id=${Product._id}">
//        <article>
//          <img src="${Product.imageUrl}" alt="${Product.altTxt}">
//            <h3 class="productName">${Product.name}</h3>
//            <p class="productDescription">${Product.description}</p>
//        </article>
//    </a>`
//}

function displayProducts (Product) {
    
    const elt_a = document.createElement("a")
    elt_a.setAttribute("href", "./product.html?id="+Product._id)

    const elt_article = document.createElement("article")
    elt_a.appendChild(elt_article)

    const elt_img = document.createElement("img")
    elt_img.setAttribute("src", Product.imageUrl)
    elt_img.setAttribute("alt", Product.altTxt)
    elt_article.appendChild(elt_img)

    const elt_h3 = document.createElement("h3")
    elt_h3.setAttribute("class", "productName")
    elt_h3.innerText = Product.name
    elt_article.appendChild(elt_h3)

    const elt_p = document.createElement("p")
    elt_p.setAttribute("class", "productDescription")
    elt_p.innerText = Product.description
    elt_article.appendChild(elt_p)

    document.getElementById("items").appendChild(elt_a)
}