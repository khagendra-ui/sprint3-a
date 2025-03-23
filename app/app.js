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
    sql = 'select * from donations';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});


app.get("/donations", function (req, res) {
const sql = 'SELECT * FROM donations';

db2.promise().query(sql)
  .then(([donations_results]) => {
    res.render('donations', { donations: donations_results });
  })
  .catch((err) => {
    console.log('Error fetching donations:', err);
    res.status(500).send('Error fetching donations');
  });
});

// Route for fetching swap items from the database
app.get("/swapItems", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from SwapItems';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});
app.get("/SwapItems", function (req, res) {
    const sql = 'SELECT * FROM SwapItems';
    
    db2.promise().query(sql)
      .then(([SwapItems_results]) => {
        res.render('SwapItems', { SwapItems: SwapItems_results });
      })
      .catch((err) => {
        console.log('Error fetching SwapItems:', err);
        res.status(500).send('Error fetching SwapItems');
      });
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
