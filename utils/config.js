const PORT = process.env.PORT;
const DEBUG = process.env.DEBUG;

const BaseURL = DEBUG === "true" ? `http://localhost:${PORT}` : "nothing yet";

module.exports = BaseURL;
