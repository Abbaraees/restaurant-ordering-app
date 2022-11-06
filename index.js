import { menuArray } from "./data.js"

render()

let myOrders = []
const checkoutForm = document.getElementById("checkout-form")
checkoutForm.addEventListener('submit', completeCheckout)


function completeCheckout(e) {
    e.preventDefault()
    const data = new FormData(checkoutForm)
    const name = data.get("name")
    
    myOrders = []
    document.getElementById("checkout-modal").style.display = 'none'
    document.getElementById("orders-container").innerHTML = `
    <p class="checkout-message">Thanks, ${name}! Your order is on its way!</p>
    `
}

document.addEventListener("click", function(e) {
    if (e.target.dataset['add']) {
        addOrder(e.target.dataset.add)
    }
    else if (e.target.dataset.remove) {
        removeOrder(e.target.dataset.remove)
    } 
    else if (e.target.id == 'complete-order-btn') {
        showCheckoutModal()
    }
    else if (e.target.id == 'close-checkout-modal-btn') {
        closeCheckoutModal()
    }
})

function addOrder(menuId) {
    const menuItem = menuArray.filter(function(item) {
        return item.id == menuId
    })[0]
    // check if the item is already added to myOrders
    if (myOrders.filter(function(order){return order.id == menuItem.id}).length) {
        // Get the item from the myOrders
        let currentOrder = myOrders.filter(function(order){return order.id == menuItem.id})[0]
        currentOrder.totalPrice += menuItem.price
        currentOrder.quantity++
    }
    // add the item to myOrders if it doesn't exists
    else {
        menuItem['quantity'] = 1
        menuItem['totalPrice'] = menuItem.price
        myOrders.push(menuItem)
    }
    renderOrders()

}

function removeOrder(orderId) {
    let currentOrder = myOrders.filter(function(order) {
        return order.id == orderId
    })[0]
    
    if (currentOrder.quantity == 1) {
        myOrders = myOrders.filter(function(order) {
            return order.id != orderId
        })
    } else {
        currentOrder.quantity--
        currentOrder.totalPrice -= currentOrder.price
    }
    renderOrders()
}

function renderOrders() {
    const ordersElement = document.getElementById("orders")
    const ordersContainer = document.getElementById("orders-container")
    ordersContainer.style.visibility = 'visible'
    let ordersHtml = ``
    let totalPrice = 0

    if (myOrders.length) {
        myOrders.forEach(function(order){
            ordersHtml += `
            <div class="order">
                <p class="order-name">
                    ${order.name}
                    <button class="decrease-order" data-remove="${order.id}">-</button>
                    <span>${order.quantity}</span>
                    <button class="increase-order" data-add="${order.id}">+</button>
                </p>
                <p class="order-price">$${order.totalPrice}</p>
            </div>
            `
            totalPrice += order.totalPrice
        })
        document.getElementById("total-price").textContent = `$${totalPrice}`
        ordersElement.innerHTML = ordersHtml
    } 
    else {
        ordersElement.innerHTML = ""
        ordersContainer.style.visibility = 'hidden'
    }

}

function showCheckoutModal() {
    document.getElementById("checkout-modal").style.display = 'block'
}

function closeCheckoutModal() {
    document.getElementById("checkout-modal").style.display = 'none'
}

function render() {
    const products = document.getElementById("products")
    let menusHtml = ``

    menuArray.forEach(function(menu){
        menusHtml += `
            <div class="menu">
                <p class="menu-emoji">${menu.emoji}</p>
                <div class="menu-info">
                    <p class="menu-name">${menu.name}</p>
                    <p class="menu-ingredients">${menu.ingredients}</p>
                    <p class="menu-price">$${menu.price}</p>
                </div>
                <button class="add-btn" id="add-btn" data-add="${menu.id}">+</button>
            </div>
        `
    })
    products.innerHTML = menusHtml
}
