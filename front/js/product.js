var url = new URL(location.href);
var ProductId = url.searchParams.get("id");
console.log (ProductId)




main()

//localStorage.clear()

async function main() {
    const ProductId = getProductId()
    const Product = await getProduct(ProductId)
    console.log(Product)
    displayProduct(Product)
    addProductInBasket(Product)
}

function getProductId(){
    return new URL(location.href).searchParams.get("id")

}

async function getProduct(ProductId) {
    try {
        const Response = await fetch(`http://localhost:3000/api/products/${ProductId}`)
        const Products = await Response.json()
        return Products
    } catch (error) {
        alert(error)
    }

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

    const elt_h1 =  document.getElementById("title")
    elt_h1.textContent = Product.name

    const elt_description = document.getElementById("description")
    elt_description.textContent = Product.description

    const elt_price =  document.getElementById("price")
    elt_price.textContent = Product.price

    const elt_select =  document.getElementById("colors")

    for (let color in Product.colors){
        const elt_option = document.createElement("option")
        elt_option.setAttribute("value", Product.colors[color])
        elt_option.textContent = Product.colors[color]
        elt_select.appendChild(elt_option)
    }

}






function addProductInBasket(Product) {

    const btnAddToCart = document.getElementById("addToCart")
    btnAddToCart.addEventListener('click', ()=>{


    let getValueFromLocalStorage = localStorage.getItem("Product")
    let valueFromLocalStorage = JSON.parse(getValueFromLocalStorage)

    const colorSelected = document.getElementById("colors").value
    const quantitySelected = document.getElementById("quantity").value

    if (quantitySelected > 0 && quantitySelected <=100 && colorSelected != 0) {

        let colorChoice = colorSelected
        let quantityChoice = quantitySelected

        let optionsProduct = {
            idProduit: ProductId,
            couleurProduit: colorChoice,
            quantiteProduit: Number(quantityChoice),
            nomProduit: Product.name,
            prixProduit: Product.price,
            descriptionProduit: Product.description,
            imgProduit: Product.imageUrl,
            altImgProduit: Product.altTxt
        }

        if (valueFromLocalStorage) {
            //const found = array1.find(element => element > 10)
            const resultFind = valueFromLocalStorage.find(
                elt => elt.idProduit === ProductId && elt.couleurProduit === colorChoice)
            

            if (resultFind) {
                let newQuantityChoice = parseInt(optionsProduct.quantiteProduit) + parseInt(resultFind.quantiteProduit)
                resultFind.quantiteProduit = newQuantityChoice 
                localStorage.setItem("Product", JSON.stringify(valueFromLocalStorage))
                console.table(valueFromLocalStorage)

            }

            else {
                valueFromLocalStorage.push(optionsProduct)
                localStorage.setItem("Product", JSON.stringify(valueFromLocalStorage))
                console.table(valueFromLocalStorage)
            }
        
        }
        else {
            valueFromLocalStorage =[]
            valueFromLocalStorage.push(optionsProduct)
            localStorage.setItem("Product", JSON.stringify(valueFromLocalStorage))
            console.table(valueFromLocalStorage)
        }


}  
        else{
            alert("Sélectionnez une couleur et une quantité comprise entre 1 et 100")
        }

})
}