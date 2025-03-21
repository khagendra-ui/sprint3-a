const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./services/db'); // Importing database connection

const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'static')));

// Route to render the Pug template
app.get('/', (req, res) => {
    res.render('index', { title: 'My Pug Page', message: 'Welcome to My Website!' });
});

// Create a route for testing the db
app.get("/donations", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from SwapItems where swap_id=2';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});


// Route for fetching swap items from the database
app.get('/swap_items', async (req, res) => {
    try {
        const sql = 'SELECT * FROM swap_items'; // Ensure correct table name
        const [results] = await db.promise().query(sql);
        res.json(results);
    } catch (error) {
        console.error('Error fetching swap items:', error);
        res.status(500).send('Error fetching swap items.');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server on dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
