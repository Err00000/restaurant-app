import {menuArray} from './data.js'
const items = document.querySelector('#items')
const yourOrder = document.querySelector('#your-order')

document.addEventListener('click', function(e){
    if(e.target.dataset.id){
        yourOrder.innerHTML = showOrder(menuArray, e.target.dataset.id)
        }
    else if(e.target.dataset.remove){
        removeProduct(menuArray, order, e.target.dataset.remove)
    }
    })

function removeProduct(menuArray, order, id){
    const product = order.filter(product=>id == product.id)[0]
    const dataObject = menuArray.filter(product=>id == product.id)[0]
    dataObject.quantity = 0
    dataObject.price = dataObject.initialPrice
    const index = order.indexOf(product)
    order.splice(index, 1)
    const newOrderHTML = order.map(product=>{
        return `<div class="final-order">
                    <div class="product-main">
                        <p class="order-product">${product.quantity} ${product.name}</p>
                        <p class="remove"><a href="#" data-remove="${product.id}">(remove)</a></p>
                    </div>
                    <div class="product-price"><p class="price">$${product.price}</p></div>
                </div>
        `
    })
    if(newOrderHTML.length==0){
        yourOrder.innerHTML = ''
    }
    else{
        newOrderHTML.unshift(`<div class="order-title"><h3>Your Order</h3></div>`)
        newOrderHTML.push(`<div class="order-button"><button id="order-btn">Complete Order</button></div>`)
    }
    yourOrder.innerHTML = newOrderHTML.join('')
}   

function showOrder(order, id){
    const orderHTML = getOrderItemsArray(order, id).map(product=>{
        return `<div class="final-order">
                    <div class="product-main">
                        <p class="order-product">${product.quantity} ${product.name}</p>
                        <p class="remove"><a href="#" data-remove="${product.id}">(remove)</a></p>
                    </div>
                    <div class="product-price"><p class="price">$${product.price}</p></div>
                </div>
        `
    })
    orderHTML.unshift(`<div class="order-title"><h3>Your Order</h3></div>`)
    orderHTML.push(`<div class="order-button"><button id="order-btn">Complete Order</button></div>`)
    return orderHTML.join('')

}    
let order = []
function getOrderItemsArray(menuArray, id)
{
    const product = menuArray.filter(product=>id == product.id)[0]
    if (!order.includes(product)){
        order.unshift(product)
        product.quantity = 1;
    }
    else if(order.includes(product)){
        product.quantity++

        product.price = product.quantity * product.initialPrice

    }
    return order

}

    function renderObjects(menuArray){
        const arrayOfObjects = menuArray.map(product=>{
           const { name, ingredients, price, emoji, id } = product
           return `<div class="item">
           <div class="emoji">${emoji}</div>
           <div class="details">
               <p class="name">${name}</p>
               <p class="ingredients">${ingredients}</p>
               <p class="price">$${price}</p>
           </div>
           <div class="addbtnContainer">
           <button class="add-button" data-id=${id}>+</button>
           </div>
       </div>
       <hr>`
        }).join('')
    return arrayOfObjects
    }

items.innerHTML=renderObjects(menuArray)