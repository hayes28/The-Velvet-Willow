// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration
};
firebase.initializeApp(firebaseConfig);

  // Get a reference to the storage service
const storage = firebase.storage();

  // Get a reference to the file you want to retrieve
const storageRef = storage.ref().child('path/to/your/file.jpg'); // Replace with your file's path

  // Get the download URL
storageRef.getDownloadURL()
    .then((url) => {
    console.log('Download URL:', url);
      // Use the URL in your HTML or JavaScript
    })
    .catch((error) => {
    console.error('Error getting download URL:', error);
    });

