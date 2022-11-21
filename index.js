import { createMenuArray } from "./data.js";

const menuData = createMenuArray()
const orderSummary = document.getElementById("order-summary")
document.addEventListener("click", function(e){
    if (e.target.dataset.addItem) {
        addItem(e.target.dataset.addItem)
    }
})

let orderedItems = []

function addItem(itemId) {
    const itemToAdd = menuData.filter(function(item){
        return item.id === Number(itemId)
    })[0]
    orderedItems.push(itemToAdd)
    console.log("orderedItems", orderedItems)

    renderOrderSummary()
}

function renderOrderSummary() {
    const orderSummaryHtml = `
    <p id="summary-title">Your Order</p>
    ${orderedItemsListHtml()}
    <div id="sum-to-pay">
        <p id="total-price">Total price:</p>
        <p class="item-price">$</p>
    </div>
    <button id="complete-order">Complete order</button>
    `
    orderSummary.innerHTML = orderSummaryHtml
    orderSummary.style.display = "block"
}

function orderedItemsListHtml(){
    let orderedItemsList = ""
    orderedItems.forEach(function(item){
        orderedItemsList += `
        <div class="item-summary">
            <p class="item-name">${item.name}</p>
            <p class="remove">remove</p>
            <p class="item-price">$${item.price}</p>
        </div>
        `
    })
    return orderedItemsList
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