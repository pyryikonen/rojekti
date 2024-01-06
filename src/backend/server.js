const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static("public"));

// Database connection pool
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT,
  connectionLimit: 10,
});

// Reusable function to handle database connections
const executeQuery = async (query, values = []) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(query, values);
    return result;
  } finally {
    connection.release();
  }
};

// CRUD operations for word_pairs

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

// Create
app.post("/wordpairs", async (req, res) => {
  try {
    const {
      source_language,
      target_language,
      source_word,
      translated_word,
      admin_id,
      user_id,
    } = req.body;

    const result = await executeQuery(
      "INSERT INTO word_pairs (source_language, target_language, source_word, translated_word, admin_id, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        source_language,
        target_language,
        source_word,
        translated_word,
        admin_id,
        user_id,
      ]
    );

    res
      .status(201)
      .json({ id: result.insertId, message: "Word pair added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read
app.get("/wordpairs", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM word_pairs");
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update
app.put("/wordpairs/:id", async (req, res) => {
  try {
    const {
      source_language,
      target_language,
      source_word,
      translated_word,
      admin_id,
      user_id,
    } = req.body;
    const { id } = req.params;

    await executeQuery(
      "UPDATE word_pairs SET source_language=?, target_language=?, source_word=?, translated_word=?, admin_id=?, user_id=? WHERE id=?",
      [
        source_language,
        target_language,
        source_word,
        translated_word,
        admin_id,
        user_id,
        id,
      ]
    );

    res.status(200).json({ message: "Word pair updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete
app.delete("/wordpairs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await executeQuery("DELETE FROM word_pairs WHERE id=?", [id]);

    res.status(200).json({ message: "Word pair deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
