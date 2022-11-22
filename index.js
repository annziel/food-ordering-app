import { createMenuArray } from "./data.js";

const menuData = createMenuArray()
const orderSummary = document.getElementById("order-summary")
const container = document.getElementById("container")

document.addEventListener("click", function(e){
    if (e.target.dataset.addItem) {
        addItem(e.target.dataset.addItem)
    }
    else if (e.target.dataset.remove) {
        removeItem(e)
    }
    else if (e.target.id === "complete-order") {
        showPaymentModal()
    }
})

let orderedItems = []

function addItem(itemId) {
    const itemToAdd = menuData.filter(function(item){
        return item.id === Number(itemId)
    })[0]
    orderedItems.push(itemToAdd)
    renderOrderSummary()
}

function renderOrderSummary() {
    const orderSummaryHtml = `
    <p id="summary-title">Your Order</p>
    ${orderedItemsListHtml()}
    <div id="sum-to-pay">
        <p id="total-price">Total price:</p>
        <p class="item-price">
            $${orderedItems.reduce(function(acc, item){
                return acc + item.price
            }, 0)}
        </p>
    </div>
    <button class="go-next" id="complete-order">Complete order</button>
    `
    orderSummary.innerHTML = orderSummaryHtml
    orderSummary.style.display = "block"
}

function orderedItemsListHtml(){
    let orderedItemsList = ""
    let itemNumber = -1
    orderedItems.forEach(function(item){
        itemNumber += 1
        orderedItemsList += `
        <div class="item-summary">
            <p class="item-name">${item.name}</p>
            <p class="remove" data-remove="${itemNumber}"">remove</p>
            <p class="item-price">$${item.price}</p>
        </div>
        `
    })
    return orderedItemsList
}

function removeItem(e) {
    let itemIndex = Number(e.target.dataset.remove)
    orderedItems.splice(itemIndex, 1)

    renderOrderSummary()
}


function showPaymentModal() {
    createPaymentModal()
    container.style.background = "linear-gradient(#fff, #BDBDBD, #fff)"
}

const paymentModal = document.createElement("div")

function createPaymentModal() {
    container.append(paymentModal)
    paymentModal.className = "payment-modal"
    paymentModal.innerHTML = `
        <h2>Enter card details</h2>
        <form id="payment-form">
            <input
                type="text"
                name="buyerName"
                placeholder="Enter your name"
                required
            >
            <input
                type="number"
                name="cardNumber"
                placeholder="Enter card number"
                required
            >
            <input
                type="number"
                name="cardCvv"
                placeholder="Enter CVV"
                required
            >
            <button type="submit" class="go-next" id="pay-btn">Pay</button>
        </form>
    `

    const paymentForm = document.getElementById("payment-form")
    paymentForm.addEventListener("submit", function(e){
        e.preventDefault()
        showMessage(paymentForm)
    })
}

function showMessage(form) {
    const paymentData = new FormData(form)

    paymentModal.style.display = "none";
    document.getElementById("order-summary").style.display = "none"
    container.style.background = "#FFF"
    
    const message = document.createElement("div")
    container.append(message)
    message.className = "message-box"
    message.innerHTML = `
        <p>
            Thanks, ${paymentData.get("buyerName")}! Your order is on its way!
        </p>
    `
}

function render() {
    let menuHtml = ""
    menuData.forEach(function(item){
        menuHtml += `
        <div class="menu-item">
            <div class="item-emoji">${item.emoji}</div>
            <div class="item-description">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <button class="add-item" data-add-item="${item.id}">+</button>
        </div>
            `
    document.getElementById("menu-list").innerHTML = menuHtml
    })
}

render()