document.addEventListener("DOMContentLoaded", function () {
    const photoContainer = document.querySelector(".photos");

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyABqHximBaL6M1sBnHENryip1QyC6qgaV4",
        authDomain: "velvet-willow.firebaseapp.com",
        projectId: "velvet-willow",
        storageBucket: "velvet-willow.appspot.com",
        messagingSenderId: "256830007264",
        appId: "1:256830007264:web:2b7af5b9f6cb6f1474ed85",
        measurementId: "G-74GN5QMSZW"
    };
    firebase.initializeApp(firebaseConfig);

    // Reference to your storage bucket
    const storageRef = firebase.storage().ref();

    // Function to fetch and display photos for a specific subcategory
    function fetchAndDisplayPhotos(subcategory) {
        console.log(`Fetching photos for ${subcategory}...`);
        const subcategoryRef = storageRef.child(`DnD-Images/VisionVault/Wedding/${subcategory}`);

        subcategoryRef.listAll().then(function (result) {
            console.log(`Fetched ${result.items.lengt} photos for ${subcategory}`);
            result.items.forEach(function (item) {
                item.getDownloadURL().then(function (url) {
                    console.log(`Image URL for ${subcategory}:`, url);
                    const img = document.createElement("img");
                    img.src = url;
                    img.alt = `${subcategory} Wedding Photo`;
                    photoContainer.appendChild(img);
                });
            });
        }).catch(function (error) {
            console.error(`Error fetching photos for ${subcategory}:`, error);
        });
    }

    // Fetch and display photos for different subcategories
    fetchAndDisplayPhotos("Boho");
    fetchAndDisplayPhotos("Classic");
    fetchAndDisplayPhotos("Glam");
    fetchAndDisplayPhotos("Modern");
    fetchAndDisplayPhotos("Romantic");
    fetchAndDisplayPhotos("Vintage");
});
