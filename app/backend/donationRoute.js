const express = require('express');
const router = express.Router();
const db = require('../services/db');
const multer = require('multer');
const path = require('path');

// Setup multer to store files in static/images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/static/image/'); // <-- match your folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST /donate
router.post('/donate', upload.single('itemImage'), async (req, res) => {
  const { donorName, itemCategory, itemColor, itemCondition } = req.body;

  if (!donorName || !itemCategory || !itemColor || !itemCondition || !req.file) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const imagePath = `./image/${req.file.filename}`;

    const insertQuery = `
      INSERT INTO donations (donorName, itemCategory, itemColor, itemCondition, itemImage)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await db.query(insertQuery, [
      donorName,
      itemCategory,
      itemColor,
      itemCondition,
      imagePath
    ]);

    res.status(201).json({
      message: 'Donation submitted successfully!',
      donationId: result.insertId
    });

  } catch (err) {
    console.error('Donation error:', err);
    res.status(500).json({ error: 'Failed to submit donation.' });
  }
});

module.exports = router;
