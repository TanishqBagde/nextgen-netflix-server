const express = require ("express");

const {Register} = require( "../controllers/user.js");
const {Login} = require("../controllers/user.js");
const {LogOut} = require("../controllers/user.js");

const app = express.Router();

app.route("/register").post(Register);
app.route("/login").post(Login);
app.route("/logout").get(LogOut);

module.exports = app;