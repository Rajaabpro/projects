import { faker } from "@faker-js/faker";
import mysql from "mysql2";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "delta_app",
  password: process.env.DB_PASS || "Deepchatb@1", // fallback
});

// Helper function for random user
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Home route → show count and all users
app.get("/", (req, res) => {
  let qCount = `SELECT COUNT(*) AS count FROM user`;
  let qUsers = `SELECT * FROM user`;

  connection.query(qCount, (err, countResult) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    let count = countResult[0].count;

    connection.query(qUsers, (err, usersResult) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.render("home.ejs", { count: count, users: usersResult });
    });
  });
});

app.listen(3000, () => {
  console.log("✅ Server is running on port 3000");
});
