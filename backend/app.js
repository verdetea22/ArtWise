const express = require('express');
const pool = require('./utils/db');
const dotenv = require('dotenv');
dotenv.config();
require('dotenv').config();

const app = express();

// Sample route
app.get('/', (req, res) => {
    res.send('ArtWise Backend is Running');
});


app.post('/artworks', async (req, res) => {
    const { title, artist, medium, year, image_url } = req.body;
    try {
        const query = `
            INSERT INTO artworks (title, artist, medium, year, image_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [title, artist, medium, year, image_url];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).send('Error saving artwork');
    }
});


// Route to fetch all records from the "artworks" table
app.get('/artworks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM artworks');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching artworks:', err.message);
        res.status(500).send('Internal Server Error');
    }
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Database Error');
    }
});
