// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const wordPairRoutes = require("./routes/wordPairRoutes");
const dotenv = require("dotenv");
const pool = require("./dbConfig");

const app = express();

dotenv.config();

/*
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
*/

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const connection = pool;
const port = 8080;
let server = undefined;

app.use(bodyParser.json());
app.use(express.static("./frontend/dist"));
app.use(authRoutes);
app.use(wordPairRoutes);
//app.use(userRoutes);

// No need for connection.connect() in the case of a pool

server = app
  .listen(port, () => {
    console.log(`SERVER: Server listening on port ${port}`);
    console.log(process.env); // ADD THIS!!
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server:", err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  console.log("SERVER: Starting graceful shutdown...");

  // Close the server
  if (server) {
    console.log("SERVER: Server was opened, so we can close it...");
    server.close((err) => {
      if (err) {
        console.error("Error closing server:", err);
      } else {
        console.log("Server closed.");

        // Try to close the database connection
        pool.end((dbErr) => {
          if (dbErr) {
            console.error("Error closing MySQL connection:", dbErr);
          } else {
            console.log("MySQL connection closed.");
            process.exit(0); // Exit the process after a successful shutdown
          }
        });
      }
    });
  } else {
    console.log("No server to close.");
    process.exit(0); // Exit the process if the server was not opened
  }
};

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

// Define graceful shutdown listeners
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
