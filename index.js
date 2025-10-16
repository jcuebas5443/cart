if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeFromCarts = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeFromCarts.length; i++) {
        removeFromCarts[i].addEventListener('click', removeFromCart);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener('change', quantityChanged);
    }

    var addTo = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addTo.length; i++) {
        addTo[i].addEventListener('click', addToCart);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClick);
}

function addToCart(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    cartTotal();
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');

    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already in the cart');
            return;
        }
    }

    var cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;
    cartRow.innerHTML = cartRowContent;
    cartItems.appendChild(cartRow);

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeFromCart);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function removeFromCart(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    cartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    cartTotal();
}

function cartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var cartPrice = cartRow.getElementsByClassName('cart-price')[0];
        var itemQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(cartPrice.innerText.replace('$', '').trim());
        var quantity = itemQuantity.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

function purchaseClick() {
    alert('Order placed');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    cartTotal();
}