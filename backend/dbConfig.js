// dbConfig.js
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT,
  connectionLimit: 10,
});

module.exports = pool;
