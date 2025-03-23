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

// rout for users
app.get("/Users", function(req, res) {
  // Assumes a table called test_table exists in your database
  sql = 'select * from Users';
  db.query(sql).then(results => {
      console.log(results);
      res.send(results)
  });
});
app.get("/Users", function (req, res) {
  const sql = 'SELECT * FROM Users';
  
  db2.promise().query(sql)
    .then(([donations_results]) => {
      res.render('Users', { users: Users_results });
    })
    .catch((err) => {
      console.log('Error fetching Users:', err);
      res.status(500).send('Error fetching Users');
    });
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
// Search donations route
app.get("/searchDonations", (req, res) => {
  const searchQuery = req.query.query;

  const sql = `
      SELECT * FROM donations 
      WHERE donorName LIKE ? OR itemCategory LIKE ? OR itemColor LIKE ? OR itemCondition LIKE ?
  `;

  const searchParam = `%${searchQuery}%`;

  db.promise()
      .query(sql, [searchParam, searchParam, searchParam, searchParam])
      .then(([results]) => {
          res.json(results);
      })
      .catch((err) => {
          console.error("Error searching donations:", err);
          res.status(500).send("Error searching donations");
      });
});
// Profile route (fetch user data from the database)
app.get("/profile/:userId", function (req, res) {
  const userId = req.params.userId;
  
  const sql = `SELECT * FROM users WHERE userId = ?`; // Assuming you have a 'users' table

  db.promise().query(sql, [userId])
      .then(([userResults]) => {
          if (userResults.length > 0) {
              res.render('profile', { user: userResults[0] });
          } else {
              res.status(404).send('User not found');
          }
      })
      .catch((err) => {
          console.log('Error fetching user profile:', err);
          res.status(500).send('Error fetching profile');
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
