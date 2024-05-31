const express = require("express");
const dataBaseConnection = require("./utils/dataBase.js");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");

dataBaseConnection();
console.log("test");

const PORT = process.env.PORT || 3500; // Default to port 3500 if PORT environment variable is not set
const ALLOWED_ORIGIN = 'https://appletvgpt.netlify.app'; // Define the allowed origin

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Use CORS middleware with specified options
app.use(cors({
  origin: ALLOWED_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors({
  origin: ALLOWED_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
