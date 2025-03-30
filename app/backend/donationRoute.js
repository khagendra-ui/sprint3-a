const express = require('express');
const router = express.Router();
const db = require('../services/db');

// Fetch all donations
router.get('/donations', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM donations');
    console.log("Results from DB:", results);
    res.json(results); // ✅ Return the full array
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching donations');
  }
});


router.get('/donations/view', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM donations');
    res.render('donations', { title: 'All Donations', donations: results });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching donations');
  }
});

// Search donations
router.get('/searchDonations', async (req, res) => {
  const searchQuery = req.query.query;
  const sql = `
    SELECT * FROM donations 
    WHERE donorName LIKE ? OR itemCategory LIKE ? OR itemColor LIKE ? OR itemCondition LIKE ?
  `;
  const searchParam = `%${searchQuery}%`;

  try {
    const [results] = await db.query(sql, [searchParam, searchParam, searchParam, searchParam]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error searching donations");
  }
});

module.exports = router;
