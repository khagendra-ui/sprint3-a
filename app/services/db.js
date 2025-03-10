require("dotenv").config();
const mysql = require('mysql2/promise');

// Set up MySQL connection pool using environment variables
const config = {
  db: {
    host: process.env.MYSQL_HOST,  // For local use, this might be 'localhost' or 'db' if using Docker
    port: process.env.MYSQL_PORT,  // Usually 3306 for MySQL
    user: process.env.MYSQL_USER,  // Your MySQL username
    password: process.env.MYSQL_PASS,  // Your MySQL password
    database: process.env.MYSQL_DATABASE,  // The database you want to connect to
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
};

// Create a connection pool to the MySQL database
const pool = mysql.createPool(config.db);

// Utility function to query the database
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

// Export the query function to be used in other files
module.exports = {
  query,
};
