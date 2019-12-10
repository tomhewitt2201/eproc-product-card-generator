// Code has been refactored for GTM Compatibility. Keep copy of original file for updates and make GTM changes at: https://babeljs.io/
const productList = [
    {
        "mig" : "MIG5268873",
        "sku" : "A577252",
        "title" : "DURACELL Plus Power AA Batteries Pack of 4",
        "price" : "£2.90",
        "img" : "/img/S/GRP/IC/AIG5278523.jpg",
        "link" : "/en/key/duracell-plus-power-batteries-a577252",
        "promo" : ""
    },
    {
        "mig" : "MIG3759526",
        "sku" : "A328316",
        "title" : "Beldray Mini Oil Filled Radiator",
        "price" : "£23.00",
        "img" : "/img/S/GRP/IC/AIG3622835.jpg",
        "link" : "/en/key/beldray-mini-oil-filled-radiator-a328316",
        "promo" : ""
    },
    {
        "mig" : "MIG3759916",
        "sku" : "A328296",
        "title" : "LCD Display Panel Heater, Heating capacity: 1000 W",
        "price" : "£15.00",
        "img" : "/img/S/GRP/IC/AIG3602589.jpg",
        "link" : "/en/key/lcd-display-panel-heater-a328296",
        "promo" : ""
    }
];

const dynamicLoadArea = document.getElementById('ShopCartDisplay');
const basket = document.querySelector('.orderShipmentBlock');

function submitBasketItem(event) {
    event.preventDefault();
    var eventTarget = event.target;
    var dataId = eventTarget.dataset.id;
    var qty = document.querySelector('.basketAdditionContainer--card--basket--qtyBlock--quantity[data-id="' + dataId + '"]').value;
    
    var itemCode = document.querySelector('#partNumber_1');
    var itemQty = document.querySelector('#quantity_1');
    var addToCart = document.querySelector('#WC_QuickOrderForm_link_1');
    
    itemCode.value = dataId;
    itemQty.value = qty;
    addToCart.click();
    searchDom();
}

class Card {
    constructor({mig, sku, title, price, img, link, promo}) {
        this.mig = mig;
        this.sku = sku;
        this.title = title;
        this.price = price;
        this.img = img;
        this.link = link;
        this.promo = promo;
    }
    
    calculatePrice() {
        if (this.promo !== "") {
            return `<p class="basketAdditionContainer--card--price__redText basketAdditionContainer--card--price"><span class="basketAdditionContainer--card--price--promo">Was ${this.price} </span>Now ${this.promo}</p>`; 
        }
        return `<p class="basketAdditionContainer--card--price">${this.price}</p>`;
    }
    
    trackingInfo(eventAction) {
        return "dataLayer.push({'event':'linkClick','eventCategory':'Basket','eventAction':'" + eventAction + "','eventLabel':'Adhoc Basket Items - " + this.sku + " " + this.title + "'});";
    }
    
    createCard() {
        return `<div class="basketAdditionContainer--card" data-id="${this.sku}"><a href="${this.link}" class="basketAdditionContainer--card--link" onclick="${this.trackingInfo('carouselProductPage')}"><picture><img src="${this.img}" alt="${this.title}" class="basketAdditionContainer--card--img" /></picture></a><h3 class="basketAdditionContainer--card--title">${this.title}</h3>${this.calculatePrice()}<div class="basketAdditionContainer--card--basket"><div class="basketAdditionContainer--card--basket--qtyBlock"><label class="basketAdditionContainer--card--basket--qtyBlock--label">Qty:</label><input type="tel" size="4" value="1" class="basketAdditionContainer--card--basket--qtyBlock--quantity" type="tel" data-id="${this.sku}" /></div><button class="basketAdditionContainer--card--basket--addToCart" type="submit" onclick="submitBasketItem(event); ${this.trackingInfo('addToBasket')}" data-id="${this.sku}">Add To Basket</button></div></div>`;
    }
}

function cardToDom() {
    
    const additionContainer = document.getElementById('basketAdditionContainer');
    const basketButtons = document.querySelectorAll('.link-secondary.text-sm');
    const basketQty = document.querySelectorAll('.input-number.quantity-input-number');

    productList.forEach(data => {
        const skuList = ["A577252", "A328316", "A328296"];
        skuList.forEach(sku => {
            if (data.sku === sku) {
                const newObj = new Card(data);
                additionContainer.innerHTML += newObj.createCard();
            }
        });
    });
    
    basketButtons.forEach(button => button.addEventListener('click', searchDom));
    basketQty.forEach(value => value.addEventListener('change', searchDom));
}

function searchDom() {
    var booleanChecker = false;
    var searchDomInterval = setInterval(function() { 
        var checkElement = document.querySelector('.basketAdditionContainer--card');
        if (checkElement === null) {
            basket = document.querySelector('.orderShipmentBlock');
            cardToDom();
            booleanChecker = true;
        }
    }, 1500);
    
    if (booleanChecker) {
        clearInterval(searchDomInterval);
    }
}

searchDom();
