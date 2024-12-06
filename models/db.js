const mysql = require("mysql");

const db = mysql.createConnection({
  host: "bt18k3te3mqxkqh5uma3-mysql.services.clever-cloud.com",
  user: "unqrbsvmrezackos",
  password: "CXgxBHNo9UCNhJErDIM0",
  database: "bt18k3te3mqxkqh5uma3",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("MySQL Connected...");
});

module.exports = db;
