require("dotenv").config();

const PORT = process.env.PORT;
const DEBUG = process.env.DEBUG;

const BaseURL = DEBUG === "true" ? `http://localhost:${PORT}` : "not";

module.exports = BaseURL;
