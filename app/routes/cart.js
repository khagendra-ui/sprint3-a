const express = require('express');
const db = require('../services/db');

const router = express.Router();

// add item to cart API
router.post('/add', async (req, res) => {
    const { user_id, clothes_id } = req.body;

    if (!user_id || !clothes_id) {
        return res.status(400).json({ error: "user ID and clothing ID are required" });
    }

    try {
        await db.query(
            "INSERT INTO cart (user_id, clothes_id) VALUES (?, ?)",
            [user_id, clothes_id]
        );
        res.status(201).json({ message: "item added to cart" });
    } catch (error) {
        res.status(500).json({ error: "failed to add item to cart: " + error.message });
    }
});

module.exports = router;
