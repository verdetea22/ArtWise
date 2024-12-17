const express = require('express');
const pool = require('./utils/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');
app.use(cors()); // Allow all origins

// Middleware to parse JSON data
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('ArtWise Backend is Running');
});

app.post('/artworks', async (req, res) => {
    const { title, artist, medium, year, image_url } = req.body;

    // Input validation: check for missing fields
    if (!title || !artist || !medium || !year || !image_url) {
        return res.status(400).json({ error: 'All fields are required: title, artist, medium, year, image_url' });
    }

    try {
        // Insert data into the database
        const query = `
            INSERT INTO artworks (title, artist, medium, year, image_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [title, artist, medium, year, image_url];

        const result = await pool.query(query, values);
        res.json(result.rows[0]); // Return the newly inserted row
    } catch (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).send('Internal Server Error');
    }
});


// GET route to fetch all artworks
app.get('/artworks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM artworks');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching artworks:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

const axios = require('axios');

app.get('/api/met-art', async (req, res) => {
    try {
        console.log("Fetching object IDs...");
        const { data: objects } = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects');

        const objectIDs = objects.objectIDs.slice(0, 100); // Fetch first 100 IDs to increase chances
        console.log("Fetched object IDs:", objectIDs);

        // Fetch details for each object with a limit of 10 valid results
        const artworks = [];
        for (let id of objectIDs) {
            try {
                const { data: art } = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                if (art.primaryImageSmall && art.title) {
                    artworks.push({
                        objectID: art.objectID,
                        title: art.title,
                        artist: art.artistDisplayName || "Unknown",
                        medium: art.medium,
                        year: art.objectDate,
                        image_url: art.primaryImageSmall
                    });
                }
                if (artworks.length >= 10) break; // Stop after finding 10 valid artworks
            } catch (innerErr) {
                console.warn(`Failed to fetch object ${id}:`, innerErr.message);
            }
        }

        console.log("Filtered artworks:", artworks);
        res.json(artworks);
    } catch (err) {
        console.error('Error fetching art from MET API:', err.message);
        res.status(500).send('Error fetching art data');
    }
});

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Database Error');
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
