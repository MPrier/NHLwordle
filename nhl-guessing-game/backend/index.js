const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3306;

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database!");
});

// Routes
app.get("/api/players", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    console.log(randomNumber);  
    db.query("SELECT * FROM players", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get("/player/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM players WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send("Player not found");
        } else {
            res.json(results[0]);
        }
    });
});



// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
