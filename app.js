require("dotenv").config();
const Express = require("express");
const app = Express();
var bodyParser = require("body-parser");
const middlewareErr = require("./middlewares/err/middleware-err");
const BaseURL = require("./utils/config");
const { companyRoutes } = require("./routes/company");
const { homePage, onlyJson } = require("./others/others");
const db = require("./model/connection");

//---------------------middlewares
app.use(onlyJson);
app.use(bodyParser.json());

//--------------------Declartion
const PORT = process.env.PORT || 9000;

//---------------------API Routes
app.get("/", homePage);
app.use("/api/v1", companyRoutes);

//----------------------error middlewares
app.use(middlewareErr);

//------------------------server
app.listen(PORT, () => {
  console.log(`Listening in: ${BaseURL}`);
});
