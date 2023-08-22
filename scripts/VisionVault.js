const storageRef = firebase.storage().ref('DnD-Images/VisionVault');

// Toggle content on thumbnail click
$(function () {
    $('.rwe-list-item__link').on('click', function () {
        const contentDiv = $(this).parents('.category').find('.content');
        contentDiv.toggle();

        const category = $(this).text().trim();
        if (category === 'Weddings') {
            const weddingCategories = ['Boho', 'Classic', 'Glam', 'Modern', 'Romantic', 'Vintage'];
            weddingCategories.forEach((weddingCategory, index) => {
                const folderRef = storageRef.child(`Wedding/${weddingCategory}`);
                fetchImagesFromFolder(folderRef, contentDiv.attr('id'), index === 0, weddingCategory);
            });
        } else if (category === 'Events') {
            const folderRef = storageRef.child('Events');
            fetchImagesFromFolder(folderRef, contentDiv.attr('id'));
        }
    });
});

function fetchImagesFromFolder(folderRef, contentId, setThumbnail = false, subCategory = null) {
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
                document.getElementById(subContentId || contentId).appendChild(img);
            });
        });
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}
