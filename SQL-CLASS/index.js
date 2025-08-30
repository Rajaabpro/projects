// index.js (ESM version)
import { faker } from "@faker-js/faker";
import mysql from "mysql2";
import express from "express";
import path from "path";
import methodOverride from "method-override";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// Middleware
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));

let port = 3000;
// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Deepchatb@1",
});

// inserting new data
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Home page route
app.get("/", (req, res) => {
  let q = "SELECT count(*) FROM user";
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("some error in DB");
    }
    let count = result[0]["count(*)"];
    res.render("home.ejs", { count });
  });
});

// Add New user
app.get("/user/add", (req, res) => {
  res.render("add.ejs");
});
// Add New user
app.post("/user/add", (req, res) => {
  let { username, password, email } = req.body;
  let id = uuidv4();
  let q = `INSERT INTO user (id,username,password,email) VALUES ('${id}','${username}','${password}','${email}' )`;

  connection.query(q, (err) => {
    if (err) {
      console.log(err);
      return res.send("some error occurred");
    }
    console.log("added new user");
    res.redirect("/user");
  });
});

// Show users
app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  connection.query(q, (err, users) => {
    if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }
    res.render("showUser.ejs", { users });
  });
});

// Edit user
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id ='${id}'`;

  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }
    let user = result[0];
    res.render("edit.ejs", { user });
  });
});

// Update user
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in DB");
    }
    let user = result[0];

    if (formPass != user.password) {
      return res.send("Password is incorrect");
    }

    let q2 = `UPDATE user SET username = '${newUsername}' WHERE id ='${id}'`;
    connection.query(q2, (err) => {
      if (err) {
        console.log(err);
        return res.send("Some error in DB");
      }
      res.redirect("/user");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
