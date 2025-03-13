const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./services/db'); // Importing database connection

const app = express();

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'static')));

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Route for fetching donation data from the database
app.get('/db_donations', async (req, res) => {
    try {
        const sql = 'SELECT * FROM Donations'; // Correct table name
        const [results] = await db.query(sql); // Ensure `db.query()` supports async/await
        res.json(results);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).send('Error fetching donations.');
    }
});

// Route for fetching swap items from the database
app.get('/swap-items', async (req, res) => {
    try {
        const sql = 'SELECT * FROM SwapItems'; // Correct table name
        const [results] = await db.query(sql);
        res.json(results);
    } catch (error) {
        console.error('Error fetching swap items:', error);
        res.status(500).send('Error fetching swap items.');
    }
});

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
