const express = require("express");
const dotenv = require("dotenv");
const dataBaseConnection = require("./utils/dataBase.js");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");

dataBaseConnection();
console.log("test");

dotenv.config({
    path: ".env"
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://appletvgpt.netlify.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add the HTTP methods you need
    allowedHeaders: ['Content-Type', 'Authorization'], // Add other headers you need
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at PORT ${process.env.PORT}`);
});
