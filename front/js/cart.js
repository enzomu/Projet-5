


let getValueFromLocalStorage = localStorage.getItem("Product") //chaine de caractere
let valueFromLocalStorage = JSON.parse(getValueFromLocalStorage) //objet

async function getProduct(ProductId) {
    try {
        const Response = await fetch(`http://localhost:3000/api/products/${ProductId}`)
        const Product = await Response.json()
        return Product
    } catch (error) {
        alert(error)
    }

}

async function displayCart () {

    if (valueFromLocalStorage)
    await (valueFromLocalStorage)

    for (let product in valueFromLocalStorage){
        console.log(valueFromLocalStorage[product].idProduit)
        let kanap = await getProduct(valueFromLocalStorage[product].idProduit)

        let productArticle = document.createElement("article")
        document.getElementById("cart__items").appendChild(productArticle)
        productArticle.className = "cart__item"
        productArticle.setAttribute('data-id', valueFromLocalStorage[product].idProduit)

        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        
        let productImg = document.createElement("img");
        productImg.setAttribute('src', kanap.imageUrl);
        productImg.setAttribute('alt', kanap.altTxt);
        productDivImg.appendChild(productImg);
        
        
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerText = kanap.name;

        
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerText = valueFromLocalStorage[product].couleurProduit;

        
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerText = kanap.price + " €";

        
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        
        let productQte = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQte);
        productQte.innerText = "Qté : ";

        
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = valueFromLocalStorage[product].quantiteProduit;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        
        let productDelete = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productDelete);
        productDelete.className = "deleteItem";
        productDelete.innerText = "Delete";
}
}

displayCart ()
