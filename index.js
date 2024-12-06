const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();

// Body parser middleware

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE,PATCH, OPIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// User routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
