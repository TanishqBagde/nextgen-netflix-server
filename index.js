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
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false
};
app.use(cors());

app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at PORT ${process.env.PORT}`);
});
