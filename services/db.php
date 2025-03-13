$servername = getenv('MYSQL_HOST');  // db (from the docker-compose.yml)
$username = getenv('MYSQL_USER');    // root
$password = getenv('MYSQL_PASS');    // password
$dbname = getenv('MYSQL_DATABASE');  // sd2-db

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
