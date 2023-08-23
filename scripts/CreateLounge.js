const storageRef = firebase.storage().ref('DnD-Images');
const category = ['Chairs', 'Rugs', 'Sofas', 'Tables'];

// Attach click event to each product card
document.querySelectorAll('.products .card').forEach(card => {
    card.addEventListener('click', function (event) {
        const category = this.classList[0]; // assuming the category class is the first class
        fetchImagesForCategory(category);
    });
});

function fetchImagesForCategory(category) {
    const folderRef = storageRef.child(category);
    folderRef.listAll().then(res => {
        // Clear any existing images for this category
        const productGrid = document.querySelector(`.${category} .product-grid`);
        productGrid.innerHTML = '';

        // Add each image from the category to the HTML
        res.items.forEach(imageRef => {
            imageRef.getDownloadURL().then(url => {
                const img = document.createElement('img');
                img.src = url;
                img.classList.add('event-image');
                productGrid.appendChild(img);
            });
        });
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}

// Function to fetch and display images for a given category
function fetchAndDisplayImages(category) {
    const folderRef = storageRef.child(`DnD-Images/${category}`);
    folderRef.listAll().then(res => {
        // Clear existing images if needed
        // ...

        res.items.forEach(imageRef => {
            imageRef.getDownloadURL().then(url => {
                const img = document.createElement('img');
                img.src = url;
                img.classList.add('product-image');
                // Append the image to the appropriate container
                // ...
            });
        });
    });
}

// Attach event listeners to "See More" buttons
document.querySelectorAll('.see-more-button').forEach(button => {
    button.addEventListener('click', function () {
        const {category} = button.dataset; // Assuming you've set the category as a data attribute on the button
        fetchAndDisplayImages(category);
    });
});
