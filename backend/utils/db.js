require('dotenv').config();
const { Pool } = require('pg');
console.log("DB Password:", process.env.DB_PASSWORD);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Database connected successfully at:', res.rows[0].now);
    }
});

module.exports = pool; // Single export
