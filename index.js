import { createMenuArray } from "./data.js";

const menuData = createMenuArray()

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
            <button class="add-item">+</button>
        </div>
            `
    document.getElementById("menu-list").innerHTML = menuHtml
    })
}

render()