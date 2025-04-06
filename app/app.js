const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const db = require('./services/db');
dotenv.config();

const app = express();

// ===== View engine setup =====
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'app/static')));

// ===== Middleware =====
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'circular-fashion-secret',
  resave: false,
  saveUninitialized: true
}));







// Route for fetching swap items from the database
app.get("/swapItems", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from SwapItems';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});
// ===== Import modular routes =====
const registerRoute = require('./backend/registerRoute');
const userRoute = require('./backend/userRoute');
const donationRoute = require('./backend/donationRoute');
const swapRoute = require('./backend/swapRoute');

app.use(registerRoute);
app.use(userRoute);
app.use(donationRoute);
app.use(swapRoute);

// ===== Login Page (GET) =====
app.get('/', (req, res) => {
  res.render('login', { title: 'Login', message: '' });
});

// ===== Register Page (GET) =====
app.get('/register', (req, res) => {
  res.render('register');
});

// ===== Index Page (GET) =====
app.get('/index', (req, res) => {
  res.render('index');
});

// ===== Home Page =====
app.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.render('index', { user: req.session.user });
});
app.get("/donations", function(req, res) {
  const category = req.query.category;
  let sql = 'SELECT * FROM donations';
  let params = [];

  if (category) {
    sql = 'SELECT * FROM donations WHERE itemCategory = ?';
    params.push(category);
  }

  db.query(sql, params)
    .then(results => res.json(results))
    .catch(err => {
      console.error("Database error:", err);
      res.status(500).send("Server error");
    });
});
// post the rating 
app.post("/submit-rating", (req, res) => {
  const { stars, message } = req.body;
  const sql = "INSERT INTO ratings (stars, message) VALUES (?, ?)";
  db.query(sql, [stars, message])
    .then(() => res.redirect('/index'))
    .catch(err => {
      console.error("Error saving rating:", err);
      res.status(500).send("Failed to submit rating");
    });
});


// ===== Error Handling =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
