require("dotenv").config();
const Express = require("express");
const app = Express();
var bodyParser = require("body-parser");
const middlewareErr = require("./middlewares/err/middleware-err");
const BaseURL = require("./utils/config");
const { companyRoutes } = require("./routes/company");
const { homePage, onlyJson } = require("./others/others");
const db = require("./model/connection");
const { loginRoutes } = require("./routes/login");

//---------------------MIDDLEWARES
app.get("/", homePage);
app.use(onlyJson);
app.use(bodyParser.json());

//---------------------DECLARATION
const PORT = process.env.PORT || 9000;

//---------------------API Routes
app.use("/api/v1", companyRoutes);
app.use("/api/v1", loginRoutes);

//---------------------Error middlewares
app.use(middlewareErr);

//----------------------Server
app.listen(PORT, () => {
  console.log(`Listening in: ${BaseURL}`);
});
