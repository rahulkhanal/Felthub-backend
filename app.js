const Express = require("express");
const app = Express();
var bodyParser = require("body-parser");
const middlewareErr = require("./middlewares/middleware-err");
const BaseURL = require("./utils/config");
require("dotenv").config();

//crusial middlewares
app.use(bodyParser.json());

//Declartion
const PORT = process.env.PORT;

//error middlewares
app.use(middlewareErr);

//server
app.listen(PORT, () => {
  console.log(`Listening in: ${BaseURL}`);
});
