<?php
require_once __DIR__ . '/vendor/autoload.php';  // Composer autoload
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Get database credentials from the .env file
$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

// Create a MySQL connection
$conn = new mysqli($host, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handling form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['donate'])) {
        // Handle donation
        $donorName = $_POST['donorName'];
        $itemCategory = $_POST['itemCategory'];
        $itemColor = $_POST['itemColor'];
        $itemCondition = $_POST['itemCondition'];
        $donationMessage = $_POST['donationMessage'];

        // For the image upload part, ensure you handle image storage and get the file path.
        $imagePath = ""; // Set this to the actual uploaded image path

        $sql = "INSERT INTO donations (donorName, itemCategory, itemColor, itemCondition, donationMessage, itemImage) 
                VALUES ('$donorName', '$itemCategory', '$itemColor', '$itemCondition', '$donationMessage', '$imagePath')";

        if ($conn->query($sql) === TRUE) {
            echo "Donation recorded successfully!";
        } else {
            echo "Error: " . $conn->error;
        }
    }

    // Add similar blocks for Borrow and Swap functionality
}
?>
