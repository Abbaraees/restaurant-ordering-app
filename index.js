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
})


function addOrder(menuId) {
    const menuItem = menuArray.filter(function(item) {
        return item.id == menuId
    })[0]
    myOrders.push(menuItem)
    renderOrders()

}

function removeOrder(orderId) {
    myOrders = myOrders.filter(function(order) {
        return order.id != orderId
    })
    renderOrders()
}

function renderOrders() {
    const ordersElement = document.getElementById("orders")
    const ordersContainer = document.getElementById("orders-container")
    ordersContainer.style.visibility = 'visible'
    let ordersHtml = ``
    let totalPrice = 0

    if (myOrders.length) {
        console.log(myOrders)
        myOrders.forEach(function(order){
            ordersHtml += `
            <div class="order">
                <p class="order-name">
                    ${order.name}
                    <button class="remove-order" data-remove="${order.id}">remove</button>
                </p>
                <p class="order-price">$${order.price}</p>
            </div>
            `
            totalPrice += order.price
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
