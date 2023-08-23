// Assuming you have already initialized Firebase in your firebase.js file

// Reference to the Firestore database
const db = firebase.firestore();

// Initialize the products array
const products = [];

// Retrieve product data from Firebase
function getProductsFromFirebase() {
    db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            // You can manipulate the productData here if needed
            products.push(productData);
        });
        
        // Call the function to render products on the page
        renderProducts(products);
    }).catch((error) => {
        console.error("Error retrieving products:", error);
    });
}

// Function to render products on the page
function renderProducts(products) {
    const tableProducts = document.getElementById("tableProducts");

    products.forEach((product, index) => {
        // Create a new row for each product
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td><button class="btn btn-danger" onclick="removeFromCart(${product.id})"><i class="fas fa-trash-alt"></i></button></td>
            <td><img src="${product.imageURL}" alt="${product.name}" class="product-image"></td>
            <td>${product.name}</td>
            <td>1</td> <!-- You can replace this with the actual quantity -->
            <td>$${product.price}</td>
        `;

        row.innerHTML = `
    <!-- ... other columns ... -->
    <td><button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button></td>
`;

        tableProducts.appendChild(row);
    });
}

// Function to handle adding a product to the cart
function addToCart(productId) {
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        products[productIndex].cart = true;
        updateCartUI();
    }
}

// Function to update the cart UI
function updateCartUI() {
    // Implement the logic for updating the cart UI here
    // You'll need to remove the current table content and re-render the cart based on the products array
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        products[productIndex].cart = false;
        updateCartUI();
    }
}


// Function to calculate the total price of items in the cart
function calculateTotal() {
    let totalPrice = 0;

    products.forEach(product => {
        if (product.cart) {
            totalPrice += product.price;
        }
    });

    return totalPrice;
}

// Function to display the cart items in the table
function displayCart() {
    const cartTableBody = document.getElementById("tableProducts");
    cartTableBody.innerHTML = "";

    products.forEach((product, index) => {
        if (product.cart) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td><button class="btn btn-danger" onclick="removeFromCart(${product.id})"><i class="fas fa-trash-alt"></i></button></td>
                <td><img src="${product.imageURL}" alt="${product.name}" class="product-image"></td>
                <td>${product.name}</td>
                <td>1</td> <!-- You can replace this with the actual quantity -->
                <td>$${product.price}</td>
            `;

            cartTableBody.appendChild(row);
        }
    });

    updateTotalUI();
}

// Function to update the UI including total price
function updateUI() {
    displayCart();
    updateTotalUI();
}

// Function to update the total price UI
function updateTotalUI() {
    const totalElement = document.getElementById("total");
    const totalPrice = calculateTotal();

    totalElement.innerHTML = `
        <tr>
            <td colspan="5" class="text-end"><strong>Total:</strong></td>
            <td>$${totalPrice.toFixed(2)}</td>
        </tr>
    `;
}

// Call the function to retrieve products from Firebase and render them
getProductsFromFirebase();

