const express = require('express');
const db = require('../services/db');

const router = express.Router();

// add item to cart API
router.post('/add', async (req, res) => {
    const { user_id, clothes_id } = req.body;

    if (!user_id || !clothes_id) {
        return res.status(400).json({ error: "user ID and clothing ID are required" });
    }

    // check user role
    const userCheck = await db.query("SELECT role FROM users WHERE id = ?", [user_id]);
    if (userCheck.length === 0 || userCheck[0].role === 'admin') {
        return res.status(403).json({ error: "admins cannot add items to the cart" });
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
