const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/db/connection'); // your existing pool.js file

const app = express();
const PORT = process.env.PORT || 5000;


// --- 2. API to add a user ---
app.post('/users', async (req, res) => {
    const { fullname, comment } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO user_details (fullname, comment) VALUES ($1, $2) RETURNING *",
            [fullname, comment]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add user" });
    }
});

// --- 3. API to get all users ---
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM user_details ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// --- 4. API to get a single user ---
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM user_details WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// --- 5. API to update a user ---
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, comment } = req.body;
    try {
        const result = await pool.query(
            "UPDATE user_details SET fullname = $1, comment = $2 WHERE id = $3 RETURNING *",
            [fullname, comment, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user" });
    }
});

// --- 6. API to delete a user ---
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM user_details WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully", user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
