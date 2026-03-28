const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();   //  FIRST define app

app.use(cors());
app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("API working");
});

// GET USERS
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ADD USER
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  db.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, name, email, age });
    }
  );
});

// UPDATE USER ✅ (place here, AFTER app defined)
app.put("/users/:id", (req, res) => {
  const { name, email, age } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Updated");
    }
  );
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deleted");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});