const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('dotenv').config();


const app = express();

// Sample route
app.get('/', (req, res) => {
    res.send('ArtWise Backend is Running');
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


const pool = require('./utils/db');

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Database Error');
    }
});
