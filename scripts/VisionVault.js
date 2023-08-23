const storageRef = firebase.storage().ref('DnD-Images/VisionVault');

function createWeddingSubcategoryCards(contentId, weddingCategories) {
    weddingCategories.forEach(weddingCategory => {
        const subContainer = document.createElement('div');
        subContainer.classList.add('card', 'subcategory-card'); // Add 'subcategory-card' class
        subContainer.style.width = '200px';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const cardTitle = document.createElement('h4');
        cardTitle.classList.add('card-title', 'subcategory-title');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = weddingCategory;
        cardBody.appendChild(cardTitle);
        subContainer.appendChild(cardBody);
        subContainer.id = `sub_${weddingCategory}`;
        document.getElementById(contentId).appendChild(subContainer);
        subContainer.dataset.expanded = 'false'; // Initialize with false

        // Attach click handler to load images for this subcategory
        subContainer.addEventListener('click', function (event) {
            event.preventDefault();
            const folderRef = storageRef.child(`Wedding/${weddingCategory}`);
            if (subContainer.dataset.expanded === 'false') {
                fetchImagesFromFolderWeddings(folderRef, subContainer.id, weddingCategory);
                subContainer.dataset.expanded = 'true'; // Set expanded state to true
            } else {
                subContainer.innerHTML = ''; // Clear the subContainer content
                subContainer.dataset.expanded = 'false'; // Set expanded state to false
                createWeddingSubcategoryCards(contentId, [weddingCategory]); // Recreate the collapsed view
            }
        });
    });
}


// Handle main category click
$(function () {
    $('.rwe-list-item__link').on('click', function (event) { // Add 'event' parameter here
        event.preventDefault(); // Add this line to prevent the default behavior

        const contentDiv = $(this).parents('.category').find('.content');
        contentDiv.toggle();

        const category = $(this).text().trim();
        if (category === 'Weddings') {
            const weddingCategories = ['Boho', 'Classic', 'Glam', 'Modern', 'Romantic', 'Vintage'];
            createWeddingSubcategoryCards(contentDiv.attr('id'), weddingCategories);
        } else if (category === 'Events') {
            const folderRef = storageRef.child('Events');
            fetchImagesFromFolderEvents(folderRef, contentDiv.attr('id'));
        }
    });
});


function fetchImagesFromFolderEvents(folderRef, contentId, setThumbnail = false, subCategory = null) {
    folderRef.listAll().then(res => {
        let subContentId = contentId;
        const subContainer = document.createElement('div'); // Sub-container for images
        subContainer.classList.add('image-container'); // Fixed this line

        if (subCategory) {
            subContentId = `${contentId}${subCategory}`;
            subContainer.id = subContentId;
            subContainer.classList.add('card');
            subContainer.style.width = '200px';
            document.getElementById(contentId).appendChild(subContainer);
        }

        res.items.forEach(imageRef => {
            imageRef.getDownloadURL().then(url => {
                const img = document.createElement('img');
                img.src = url;
                img.classList.add('event-image');
                subContainer.appendChild(img); // Fixed this line
            });
        });

        document.getElementById(subContentId || contentId).appendChild(subContainer); // Append the subContainer outside the loop
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}


// Fetch images for a specific wedding subcategory
function fetchImagesFromFolderWeddings(folderRef, contentId, weddingCategory) {
    folderRef.listAll().then(res => {
        const subContainer = document.getElementById(`sub_${weddingCategory}`); // Get the subContainer using the ID
        const imageContainer = document.createElement('div'); // Create a new container for images
        imageContainer.classList.add('image-container'); // Add the class (if needed)

        res.items.forEach(imageRef => {
            imageRef.getDownloadURL().then(url => {
                const img = document.createElement('img');
                img.src = url;
                img.classList.add('card-img-top', 'event-image'); // Add 'event-image' class if needed
                imageContainer.appendChild(img); // Append the image to the imageContainer
            });
        });

        subContainer.appendChild(imageContainer); // Append the imageContainer to the subContainer
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}
