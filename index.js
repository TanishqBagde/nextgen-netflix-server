const express = require("express");
const dotenv = require("dotenv");
const dataBaseConnection = require("./utils/dataBase.js");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");

dataBaseConnection();

dotenv.config({
    path: ".env"
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://appletvgpt.netlify.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at PORT ${process.env.PORT}`);
});
