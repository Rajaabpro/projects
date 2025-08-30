import { faker } from "@faker-js/faker";
import mysql from "mysql2/promise"; // ✅ promise-based API
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
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
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
    faker.phone.number(),
    faker.location.city(),
  ];
};

// Home route to show count and all users
app.get("/", async (req, res) => {
  try {
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS count FROM user"
    );
    const count = countResult[0].count;

    const [usersResult] = await connection.query("SELECT * FROM user");

    res.render("home.ejs", { count, users: usersResult });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Database error");
  }
});

// Show route
app.get("/show", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM user");
    res.render("show.ejs", { users: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Database error");
  }
});

// Add a new user
app.get("/add", async (req, res) => {
  try {
    const user = getRandomUser();
    await connection.query(
      "INSERT INTO user (id, username, email, password, phone, address) VALUES (?)",
      [user]
    );
    res.send("✅ New random user added!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error inserting user");
  }
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server is running on port 3000");
});
