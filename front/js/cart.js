


let getvalueFromLocalStorage = localStorage.getItem("Product") //chaine de caractere
let valueFromLocalStorage = JSON.parse(getvalueFromLocalStorage) //objet
const positionEmptyCart = document.getElementById("cart__items")


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

    if (valueFromLocalStorage){
        

        for (let product in valueFromLocalStorage){
            console.log(valueFromLocalStorage[product].idProduit)
            let kanap = await getProduct(valueFromLocalStorage[product].idProduit)

            let productArticle = document.createElement("article")
            document.getElementById("cart__items").appendChild(productArticle)
            productArticle.className = "cart__item"
            productArticle.setAttribute('data-id', valueFromLocalStorage[product].idProduit)
            productArticle.setAttribute("data-color", valueFromLocalStorage[product].couleurProduit)

            let productDivImg = document.createElement("div")
            productArticle.appendChild(productDivImg)
            productDivImg.className = "cart__item__img"

            
            let productImg = document.createElement("img")
            productImg.setAttribute('src', kanap.imageUrl)
            productImg.setAttribute('alt', kanap.altTxt)
            productDivImg.appendChild(productImg)
            
            
            let productItemContent = document.createElement("div")
            productArticle.appendChild(productItemContent)
            productItemContent.className = "cart__item__content"

            
            let productItemContentTitlePrice = document.createElement("div")
            productItemContent.appendChild(productItemContentTitlePrice)
            productItemContentTitlePrice.className = "cart__item__content__titlePrice"
            
            
            let productTitle = document.createElement("h2")
            productItemContentTitlePrice.appendChild(productTitle)
            productTitle.innerText = kanap.name

            
            let productColor = document.createElement("p")
            productTitle.appendChild(productColor)
            productColor.innerText = valueFromLocalStorage[product].couleurProduit

            
            let productPrice = document.createElement("p")
            productItemContentTitlePrice.appendChild(productPrice)
            productPrice.innerText = kanap.price + " €"

            
            let productItemContentSettings = document.createElement("div")
            productItemContent.appendChild(productItemContentSettings)
            productItemContentSettings.className = "cart__item__content__settings"

            
            let productItemContentSettingsQuantity = document.createElement("div")
            productItemContentSettings.appendChild(productItemContentSettingsQuantity)
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity"
            
            
            let productQte = document.createElement("p")
            productItemContentSettingsQuantity.appendChild(productQte)
            productQte.innerText = "Qté : "

            
            let productQuantity = document.createElement("input")
            productItemContentSettingsQuantity.appendChild(productQuantity)
            productQuantity.value = valueFromLocalStorage[product].quantiteProduit
            productQuantity.className = "itemQuantity"
            productQuantity.setAttribute("type", "number")
            productQuantity.setAttribute("min", "1")
            productQuantity.setAttribute("max", "100")
            productQuantity.setAttribute("name", "itemQuantity")

            
            let productItemContentSettingsDelete = document.createElement("div")
            productItemContentSettings.appendChild(productItemContentSettingsDelete)
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete"

            
            let productDelete = document.createElement("p")
            productItemContentSettingsDelete.appendChild(productDelete)
            productDelete.className = "deleteItem"
            productDelete.innerText = "Supprimer"
            productDelete.setAttribute("data-id", valueFromLocalStorage[product].idProduit)
            productDelete.setAttribute("data-color", valueFromLocalStorage[product].couleurProduit)
            productDelete.addEventListener('click', (event) => {
                deleteProduct (event, valueFromLocalStorage[product].idProduit, valueFromLocalStorage[product].couleurProduit)
                
            } )

        }

        quantityChanged()

    }
    else 
        
        positionEmptyCart.innerText = "Votre panier est vide"
    


}

displayCart ()

//function getTotals(){
//
//    
//    var productQuantity = document.getElementsByClassName("itemQuantity")
 //   var lengthQuantity = productQuantity.length
//    
//    console.log(lengthQuantity)
 //   console.log(productQuantity)
//
//    for (var i = 0; i < lengthQuantity; ++i) {
//        totalQuantity += productQuantity[i].valueAsNumber
//    }
//
//    let productTotalQuantity = document.getElementById('totalQuantity');
//    productTotalQuantity.innerText = totalQuantity
//    console.log(totalQuantity)
//
 //   
//    totalPrice = 0;
//
//    for (var i = 0; i < lengthQuantity; ++i) {
//        totalPrice += (productQuantity[i].valueAsNumber * valueFromLocalStorage[i].prixProduit)
 //   }
//
 //   let productTotalPrice = document.getElementById('totalPrice')
//    productTotalPrice.innerText = totalPrice
//    console.log(totalPrice)
//}

//getTotals ()


async function getTotals(){


    let totalQuantity = 0;
    let totalPrice = 0;
    for (let product in valueFromLocalStorage){
        console.log(valueFromLocalStorage[product].idProduit)
        let kanap = await getProduct(valueFromLocalStorage[product].idProduit)

        totalQuantity += parseInt(valueFromLocalStorage[product].quantiteProduit)
        totalPrice += parseInt(kanap.price * valueFromLocalStorage[product].quantiteProduit)

        document.getElementById("totalQuantity").innerText = totalQuantity
        document.getElementById("totalPrice").innerText = totalPrice


}
}

getTotals()





async function deleteProduct(event, idDelete, colorDelete) {

            event.preventDefault();
            
            valueFromLocalStorage = valueFromLocalStorage
                .filter ( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.setItem("Product", JSON.stringify(valueFromLocalStorage));

        
    
}




function quantityChanged ()  {
    let qtyModif = document.querySelectorAll(".itemQuantity")


    for (let l = 0; l < qtyModif.length; l++) {
        qtyModif[l].addEventListener("change", () => {


            let qtyInputValue = qtyModif[l].valueAsNumber;

            valueFromLocalStorage[l].quantiteProduit = qtyInputValue;

            getTotals(); 
            console.log(getTotals())

            localStorage.setItem("Product", JSON.stringify(valueFromLocalStorage));

        })
    }
}
//quantityChanged()

function orderCheck() {

const firstNameRegex = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/;
const lastNameRegex = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/;
const addressRegex = /^[A-Za-z0-9'âêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{5,50}$/;
const cityRegex = /^[A-Za-z'âêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/;
const mailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


let btnOrder = document.getElementById("order")


    const firstName = document.getElementById('firstName');
    const firstNameError = document.getElementById('firstNameErrorMsg');
    const firstNameValue = firstName.value.trim();

    const lastName = document.getElementById('lastName');
    const lastNameError = document.getElementById('lastNameErrorMsg');
    const lastNameValue = lastName.value.trim();

    const address = document.getElementById('address');
    const addressError = document.getElementById('addressErrorMsg');
    const addressValue = address.value.trim();

    const city = document.getElementById('city');
    const cityError = document.getElementById('cityErrorMsg');
    const cityValue = city.value.trim();

    const mail = document.getElementById('email');
    const mailError = document.getElementById('emailErrorMsg');
    const mailValue = mail.value.trim();
    let check = true

    if (firstNameValue.match(firstNameRegex)){
        firstNameError.innerText = "";
    }else{
        check = false;
        firstNameError.innerText = "Veuillez saisir un prénom valide";
    }
    
    if (lastNameValue.match(lastNameRegex)){
        lastNameError.innerText = "";
    }else{
        check = false;
        lastNameError.innerText = "Veuillez saisir un nom de famille valide";
    }
    
    if (addressValue.match(addressRegex)){
        addressError.innerText = "";
    }else{
        check = false;
        addressError.innerText = "Veuillez saisir une adresse valide";
    }
    
    if (cityValue.match(cityRegex)){
        cityError.innerText = "";
    }else{
        check = false;
        cityError.innerText = "Veuillez saisir un nom de ville valide"
    }
    
    if (mailValue.match(mailRegex)){
        mailError.innerText = "";
    }else{
        check = false;
        mailError.innerText = "Veuillez saisir une adresse mail valide"
    }
    return check
    





}



function requestBody(){

    const firstNameInput = document.getElementById("firstName")
    const firstName = firstNameInput.value

    const lastNameInput = document.getElementById("lastName")
    const lastName = lastNameInput.value

    const addressInput = document.getElementById("address")
    const address = addressInput.value

    const cityInput = document.getElementById("city")
    const city = cityInput.value

    const emailInput = document.getElementById("email")
    const email = emailInput.value

    let idProduct  = [];
    for (let i = 0; i < valueFromLocalStorage.length; i++){
    for (let number = valueFromLocalStorage[i].quantity; number>0; number--){
        idProduct.push(valueFromLocalStorage[i].id)
    }
    }
    
    const body = { 
    contact: {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email
    },
    products : idProduct,
    }
    return body
};

function postApi(body){
    fetch("http://localhost:3000/api/products/order",{
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
        "Content-Type" : "application/json",
    }
    })
    .then(response => response.json())
    .then(response => {
    let valueFromLocalStorage = []
    localStorage.setItem('Product',JSON.stringify(valueFromLocalStorage))
    window.location.href = `./confirmation.html?orderId=${response.orderId}`
    })
    .catch(function(error){
    console.error(error)
    });
}






function submitForm (e){
    e.preventDefault();
    if (valueFromLocalStorage.length === 0){
    alert('Mettez au moins un article dans le panier')
    }else{
    if(orderCheck()){
    postApi(requestBody())
    };
    }
};

const submitBtn = document.getElementById('order')
submitBtn.addEventListener("click", (e) => submitForm(e))