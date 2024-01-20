const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const session = require("express-session");
const { loginUser, registerUser } = require("../utils/userUtils");
const { fetchUsers } = require("../database/databaseFunctions");
const dotenv = require("dotenv");

const router = express.Router();
dotenv.config();

/*
router.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
*/
router.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

router.use(bodyParser.json());

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const registrationResult = await registerUser(
      username,
      email,
      password,
      role
    );

    if (registrationResult.success) {
      res
        .status(201)
        .json({ success: true, message: "User registered successfully!" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "User registration failed." });
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(req, email, password);

  if (result.success) {
    res.status(200).json({ success: true, user: result.user });
  } else {
    console.log("Login failed:", result.message);
    res.status(401).json(result);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/translate", async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    const translation = await translate(text, targetLanguage);
    res.status(200).json({ translation });
  } catch (error) {
    console.error("Translation Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
