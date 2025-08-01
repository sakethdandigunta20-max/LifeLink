const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Update these values with your PostgreSQL credentials
const pool = new Pool({
  user: 'postgres',           // your postgres username
  host: 'localhost',
  database: 'bloodbank',      // your database name
  password: 'saketh123',  // your postgres password
  port: 5432,
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, blood_type, location, last_donation, status } = req.body;
  try {
    await pool.query(
      'INSERT INTO donors (name, blood_type, location, last_donation, status) VALUES ($1, $2, $3, $4, $5)',
      [name, blood_type, location, last_donation, status]
    );
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get donors endpoint
app.get('/api/donors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donors');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));