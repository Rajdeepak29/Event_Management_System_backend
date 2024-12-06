const db = require("./models/db");

const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )
`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Users table created successfully.");
    }
  });
};

createUsersTable();

const createEvent = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS addevent (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Eventname VARCHAR(255) NOT NULL,
        Category VARCHAR(255) NOT NULL,
        Venuename VARCHAR(255) NOT NULL,
        Location VARCHAR(255) NOT NULL,
        Tickets INT NOT NULL,
        Ticketsprice DECIMAL(10, 2) NOT NULL,
        startdate DATE NOT NULL,
        enddate DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Event table created successfully.");
    }
  });
};
createEvent();

const createCategory = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS category (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Categoryname VARCHAR(255) NOT NULL,
        Categorydescription TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

       
    )
`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Category created successfully.");
    }
  });
};
createCategory();

const createBooking = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS booking (
        id INT AUTO_INCREMENT PRIMARY KEY,
        paymentid VARCHAR(255) NOT NULL,
        eventname VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        tickets INT NOT NULL,
        bookingdate DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Booking created successfully.");
    }
  });
};
createBooking();
