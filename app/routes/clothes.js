const express = require('express');
const db = require('../services/db');

const router = express.Router();

// add a new clothing item API
router.post('/add', async (req, res) => {
    const { user_id, name, description, image_url, price, shipping_fee, delivery_method } = req.body;

    if (!user_id || !name || !delivery_method) {
        return res.status(400).json({ error: "user ID, clothing name, and delivery method are required" });
    }

    try {
        await db.query(
            "INSERT INTO clothes (user_id, name, description, image_url, price, shipping_fee, delivery_method) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [user_id, name, description, image_url, price, shipping_fee, delivery_method]
        );
        res.status(201).json({ message: "clothing item added successfully" });
    } catch (error) {
        res.status(500).json({ error: "failed to add clothing item: " + error.message });
    }
});

module.exports = router;
