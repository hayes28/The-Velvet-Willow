$(function() {
    $('.thumbnail').on('click', function () {
        $(this).siblings('.content').toggle();
    });
});

function fetchImages(category, thumbnailId, contentId) {
    const storageRef = firebase.storage().ref('DnD-Images/VisionVault');

    // Set thumbnail for the category
    storageRef.child(`${category}/Tea Party.webp`).getDownloadURL().then(url => {
        document.getElementById(thumbnailId).src = url;
    }).catch(error => {
        console.error('Thumbnail error:', error);
    });

    // If it's the "Wedding" category, set up the click event to fetch subcategories
    if (category === 'Wedding') {
        $('#' + thumbnailId).on('click', function () {
            const weddingCategories = ['Boho', 'Classic', 'Glam', 'Modern', 'Romantic', 'Vintage'];
            weddingCategories.forEach((weddingCategory, index) => {
                const folderRef = storageRef.child(`${category}/${weddingCategory}`);
                fetchImagesFromFolder(folderRef, contentId, index === 0, weddingCategory);
            });
        });
    }
    else {
        // Handle other categories (e.g., 'Events') as needed
    }
}


function fetchImagesFromFolder(folderRef, contentId, setThumbnail, subCategory = null) {
    folderRef.listAll().then(res => {
        let subContentId = contentId;
        if (subCategory) {
            subContentId = `${contentId}${subCategory}`;
            const subContainer = document.createElement('div');
            subContainer.id = subContentId;
            document.getElementById(contentId).appendChild(subContainer);
            // You can add a thumbnail for the subcategory here as well
        }

        res.items.forEach(imageRef => {
            imageRef.getDownloadURL().then(url => {
                const img = document.createElement('img');
                img.src = url;
                document.getElementById(subContentId).appendChild(img);
            });
        });
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}
fetchImages('Events', 'eventsThumbnail', 'eventsContent');
fetchImages('Wedding', 'weddingsThumbnail', 'weddingsContent');
