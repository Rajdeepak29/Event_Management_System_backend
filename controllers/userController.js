const db = require("../models/db");
const stripe = require("stripe")(
  "sk_test_51QQRCEHhF3wo4tl2gsnHBPhkvEXiMRVnBoIsITvBzTilVrS1NfnVUSzz8zwqcVoj2XH80A8xc7usqHbh6dTcNPma003q9in8fh"
);

exports.getAllUsers = (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

exports.createUser = (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  console.log("Register request received:", newUser);

  // Check if the email already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [newUser.email], (err, result) => {
    if (err) {
      console.error("Error checking user existence:", err);
      return res
        .status(500)
        .json({ message: "Database error", success: false });
    }

    if (result.length > 0) {
      console.log("User already exists:", newUser.email);
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Insert new user
    const insertQuery = "INSERT INTO users SET ?";
    db.query(insertQuery, newUser, (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res
          .status(500)
          .json({ message: "Database error", success: false });
      }

      console.log("User registered successfully:", newUser);
      return res
        .status(200)
        .json({ message: "User registered successfully", success: true });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and Password are required", success: false });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err.stack);
      return res
        .status(500)
        .json({ message: "Database query error", success: false });
    }
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const user = result[0];

    if (password === user.password) {
      return res.status(200).json({
        message: "Login successful",
        success: true,
        name: user.name,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
  });
};

exports.adminlogin = (req, res) => {
  const { email, password } = req.body;

  const adminEmail = "admin24@gmail.com";
  const adminPassword = "Admin2024";

  if (email === adminEmail && password === adminPassword) {
    res.status(200).json({ success: true, message: "Login successful!" });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password." });
  }
};

exports.addevent = (req, res) => {
  const {
    eventName,
    category,
    venueName,
    location,
    tickets,
    ticketsPrice,
    startDate,
    endDate,
  } = req.body;

  const query =
    "INSERT INTO addevent (eventName, category, venueName, location, tickets, ticketsPrice, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      eventName,
      category,
      venueName,
      location,
      tickets,
      ticketsPrice,
      startDate,
      endDate,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting event:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error adding event" });
      }
      res
        .status(200)
        .json({ success: true, message: "Event added successfully!" });
    }
  );
};

exports.addcategory = (req, res) => {
  const { Categorytitle, Categorydescription } = req.body;

  const checkCategoryQuery = "SELECT * FROM category WHERE Categoryname = ?";
  db.query(checkCategoryQuery, [Categorytitle], (err, result) => {
    if (err) {
      console.error("Error checking category:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error checking category" });
    }

    if (result.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const insertCategoryQuery =
      "INSERT INTO category (Categoryname, Categorydescription) VALUES (?, ?)";
    db.query(
      insertCategoryQuery,
      [Categorytitle, Categorydescription],
      (err, result) => {
        if (err) {
          console.error("Error adding category:", err);
          return res.status(500).json({
            success: false,
            message: "Error adding category",
          });
        }
        res
          .status(200)
          .json({ success: true, message: "Category added successfully" });
      }
    );
  });
};

exports.allevent = (req, res) => {
  const query = "SELECT * FROM addevent";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error fetching events" });
    }
    res.status(200).json({ success: true, events: result });
  });
};

exports.deleteEvent = (req, res) => {
  const { Id } = req.params;
  const query = "DELETE FROM addevent WHERE Id = ?";
  db.query(query, [Id], (err, result) => {
    if (err) {
      console.error("Error deleting event:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error deleting event" });
    }
    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully!" });
  });
};

exports.updateEvent = (req, res) => {
  const { Id } = req.params;
  const {
    Eventname,
    Category,
    Venuename,
    Location,
    Tickets,
    Ticketsprice,
    startdate,
    enddate,
  } = req.body;

  const query = `
      UPDATE addevent
      SET Eventname = ?, Category = ?, Venuename = ?, Location = ?, Tickets = ?, Ticketsprice = ?, startdate = ?, enddate = ?
      WHERE Id = ?
    `;

  db.query(
    query,
    [
      Eventname,
      Category,
      Venuename,
      Location,
      Tickets,
      Ticketsprice,
      startdate,
      enddate,
      Id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating event:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error updating event" });
      }
      res
        .status(200)
        .json({ success: true, message: "Event updated successfully!" });
    }
  );
};

exports.eventDetails = (req, res) => {
  const { Id } = req.params;

  const query = "SELECT * FROM addevent WHERE Id = ?";

  db.query(query, [Id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length > 0) {
      return res.json(results[0]);
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  });
};

exports.allCategory = (req, res) => {
  const query = "SELECT * FROM category";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error fetching categories" });
    }
    res.status(200).json({ success: true, categories: result });
  });
};

exports.deleteCategory = (req, res) => {
  const { Id } = req.params;
  const query = "DELETE FROM category WHERE Id = ?";
  db.query(query, [Id], (err, result) => {
    if (err) {
      console.error("Error deleting category:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error deleting category" });
    }
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully!" });
  });
};

exports.updateCategory = (req, res) => {
  const { Id } = req.params;
  const { Categoryname } = req.body;
  const query = "UPDATE category SET Categoryname = ? WHERE Id = ?";
  db.query(query, [Categoryname, Id], (err, result) => {
    if (err) {
      console.error("Error updating category:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error updating category" });
    }
    res
      .status(200)
      .json({ success: true, message: "Category updated successfully!" });
  });
};

let bookings = [];

exports.checkoutSession = async (req, res) => {
  const {
    eventId,

    eventName,
    category,
    username,
    totalTickets,
    totalPrice,
  } = req.body;

  console.log(req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:3000/Mybooking`,
      cancel_url: `http://localhost:3000/event-details/${eventId}`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Tickets for Event ${eventId}`,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: totalTickets,
        },
      ],
    });
    console.log(session);
    const paymentId = session.id;
    const bookingDate = new Date();

    const query =
      "INSERT INTO booking (paymentid, eventname, category, username, tickets, bookingdate) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      paymentId,
      eventName,
      category,
      username,
      totalTickets,
      bookingDate,
    ];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Error inserting data into database:", error);
        res.status(500).send("Error inserting booking details into database");
      } else {
        console.log("Booking details inserted successfully");
      }
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Error creating Stripe session");
  }
};

exports.getBookingdetailsUsername = (req, res) => {
  const { username } = req.params;

  const query = "SELECT * FROM booking WHERE username = ?";

  db.query(query, [username], (error, results) => {
    if (error) {
      console.error("Error retrieving booking details:", error);
      return res
        .status(500)
        .json({ message: "Error retrieving booking details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.json({ bookings: results });
  });
};

exports.getBookingdetails = (req, res) => {
  const query = "SELECT * FROM booking";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving booking details:", error);
      return res
        .status(500)
        .json({ message: "Error retrieving booking details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.json({ bookings: results });
  });
};

exports.countTickets = (req, res) => {
  const query =
    "SELECT eventname, SUM(tickets) AS total_tickets FROM booking GROUP BY eventname";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving ticket count:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length > 0) {
      return res.json({ ticketCounts: results });
    } else {
      return res.status(404).json({ message: "No bookings found" });
    }
  });
};
