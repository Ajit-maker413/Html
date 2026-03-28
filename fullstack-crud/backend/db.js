const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "testuser",
  password: "1234",
  database: "userdb"
});

db.connect(err => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("MySQL Connected...");
  }
});

module.exports = db;