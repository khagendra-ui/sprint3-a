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
  res.render('index', {
    title: 'My Pug Page',
    message: 'Welcome to My Website!'
  });
});

// Route for retrieving all users (returns JSON)
app.get("/Users", (req, res) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results);
  });
});

// Profile route (fetch user data from the database)
app.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM Users WHERE UserID = ?';

  db.query(sql, [userId], (err, userResults) => {
    if (err) {
      console.log('Error fetching user profile:', err);
      return res.status(500).send('Error fetching profile');
    }

    if (userResults.length > 0) {
      res.render('profile', { user: userResults[0] });
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Route for fetching all donation entries
app.get("/donations", (req, res) => {
  const sql = 'SELECT * FROM donations';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error fetching donations");
    res.json(results);
  });
});

// Search donations route
app.get("/searchDonations", (req, res) => {
  const searchQuery = req.query.query;
  const searchParam = `%${searchQuery}%`;

  const sql = `
    SELECT * FROM donations 
    WHERE donorName LIKE ? OR itemCategory LIKE ? OR itemColor LIKE ? OR itemCondition LIKE ?
  `;

  db.query(sql, [searchParam, searchParam, searchParam, searchParam], (err, results) => {
    if (err) {
      console.error("Error searching donations:", err);
      return res.status(500).send("Error searching donations");
    }
    res.json(results);
  });
});

// Route for fetching swap items from the database
app.get("/SwapItems", (req, res) => {
  const sql = 'SELECT * FROM SwapItems';
  db.query(sql, (err, swapItems) => {
    if (err) {
      console.log('Error fetching SwapItems:', err);
      return res.status(500).send('Error fetching SwapItems');
    }
    res.render('SwapItems', { SwapItems: swapItems });
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


// just for test
app.get("/test", (req, res) => {
  console.log("Test route hit!");
  res.send("It works!");
});

