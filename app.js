const Express = require("express");
const app = Express();
var bodyParser = require("body-parser");
const middlewareErr = require("./middlewares/err/middleware-err");
const BaseURL = require("./utils/config");
const { userRoutes } = require("./routes/user");
const sequelize = require("./model/connection");
require("dotenv").config();

//crusial middlewares
app.use(bodyParser.json());

//Declartion
const PORT = process.env.PORT || 9000;

//API Routes
app.use("/", userRoutes);

//error middlewares
app.use(middlewareErr);

//server
app.listen(PORT, () => {
  console.log(`Listening in: ${BaseURL}`);
});
