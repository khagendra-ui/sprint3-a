const express = require('express');
const db = require('../services/db');

const router = express.Router();

// add a new clothing item API
router.post('/add', async (req, res) => {
    const { user_id, name, description, image_url, price, shipping_fee, delivery_method } = req.body;

    if (!user_id || !name || !delivery_method) {
        return res.status(400).json({ error: "user ID, clothing name, and delivery method are required" });
    }

    // check if user is an admin
    const userCheck = await db.query("SELECT role FROM users WHERE id = ?", [user_id]);
    if (userCheck.length === 0 || userCheck[0].role === 'admin') {
        return res.status(403).json({ error: "admins cannot add clothing items" });
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

// admin can delete any items
router.delete('/:id/delete', async (req, res) => {
    const { user_id } = req.body; // user making the request

    if (!user_id) {
        return res.status(400).json({ error: "user ID is required" });
    }

    // check user role
    const userCheck = await db.query("SELECT role FROM users WHERE id = ?", [user_id]);
    if (userCheck.length === 0 || userCheck[0].role !== 'admin') {
        return res.status(403).json({ error: "only admins can delete clothing items" });
    }

    try {
        await db.query("DELETE FROM clothes WHERE id = ?", [req.params.id]);
        res.status(200).json({ message: "clothing item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "failed to delete clothing item: " + error.message });
    }
});



module.exports = router;
