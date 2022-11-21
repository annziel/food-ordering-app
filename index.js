import { createMenuArray } from "./data.js";

const menuData = createMenuArray()
const orderSummary = document.getElementById("order-summary")

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
    <button id="complete-order">Complete order</button>
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
    const paymentModal = document.createElement("div")
    document.getElementById("container").append(paymentModal)
    paymentModal.className = "payment-modal"
    paymentModal.style.display = "block"
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