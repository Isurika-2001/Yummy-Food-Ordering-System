const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

const buildPath = path.join(__dirname, '../client/build');

const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./user.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

app.use(bodyParser.json());

app.use(express.static(buildPath));

app.use(cors());

app.post("/register", (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.c_password
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const nameRegex = /^[a-zA-Z]{3,30}$/;
    if (!nameRegex.test(req.body.name)) {
      return res.status(400).json({
        error: "Invalid name.",
      });
    }

    if (req.body.password !== req.body.c_password) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email." });
    }

    const passwordRegex = /^[a-zA-Z0-9]{5,30}$/;
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).json({
        error: "Invalid password. Password must contain at least 5 characters.",
      });
    }

    const sql = `INSERT INTO user(name, email, password) VALUES(?,?, ?)`;
    db.run(sql, [req.body.name, req.body.email, req.body.password], (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ message: "User created." });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.post("/login", (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Invalid email." });
    }

    const sql = `SELECT name, email, password, contact_no, address, profile_image FROM user WHERE email = ? AND password = ?`;
    db.get(sql, [req.body.email, req.body.password], (err, row) => {
      if (err) {
        res.status(500).json({ message: "Server error." });
      } else if (!row) {
        res.status(401).json({ message: "Invalid email or password." });
      } else {
        // Return user details in the response
        const user = {
          name: row.name,
          email: row.email,
          password: row.password,
          contact_no: row.contact_no,
          address: row.address,
          profile_image: row.profile_image,
        };
        res.status(200).json({ message: "User logged in.", user });
      }
    });
  } catch (err) {
    console.log("Server error.");
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/updateProfile", (req, res) => {
  const sql = `UPDATE user SET name=?, address=?, contact_no=?, profile_image=? WHERE email=?`;
  db.run(
    sql,
    [
      req.body.name,
      req.body.address,
      req.body.contact_no,
      req.body.profile_image,
      req.body.email,
    ],
    (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }
      console.log(req.body.profile_image);
      return res.status(200).json({ message: "User updated." });
    }
  );
});

app.listen(8000, () => console.log("Server started"));
