// cart.js
// Get all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Attach a click event listener to each button
addToCartButtons.forEach(button => {
button.addEventListener('click', addToCart);
});

// Function to add an item to the cart
function addToCart(event) {
    const item = event.target.getAttribute('data-item');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the item is already in the cart
    if (!cartItems.includes(item)) {
        cartItems.push(item);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert('Item added to cart!');
    } else {
        alert('Item is already in the cart!');
    }
}

// cart.js
// Get the cart items from local storage
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.getElementById('cart-items');

// Clear the previous items before adding new ones
cartList.innerHTML = '';

// Loop through the items and add them to the cart display
cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    cartList.appendChild(li);
});

