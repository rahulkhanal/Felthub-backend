require("dotenv").config();
const Express = require("express");
const app = Express();
var bodyParser = require("body-parser");
const middlewareErr = require("./middlewares/err/middleware-err");
const BaseURL = require("./utils/config");
const { companyRoutes } = require("./routes/company");
const { homePage, onlyJson, routeNotFound } = require("./others/others");
const db = require("./model/connection");
const { loginRoutes } = require("./routes/login");
const { bannerRoutes } = require("./routes/banner");
const { documentRoutes } = require("./routes/document");
const { socialRoutes } = require("./routes/social");
const { teamRoutes } = require("./routes/team");
const { categoryRoutes } = require("./routes/category");
const { attributeRoutes } = require("./routes/attribute");
const { productRoutes } = require("./routes/product");

//---------------------MIDDLEWARES
app.get("/", homePage);
// app.use(onlyJson);
app.use("/assets", Express.static("assets")); //server file
app.use(bodyParser.json());
app.use(Express.urlencoded({ extended: false }));

//---------------------DECLARATION
const PORT = process.env.PORT || 9000;

//---------------------API Routes
app.use("/api/v1", companyRoutes);
app.use("/api/v1", loginRoutes);
app.use("/api/v1", bannerRoutes);
app.use("/api/v1", documentRoutes);
app.use("/api/v1", socialRoutes);
app.use("/api/v1", teamRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", attributeRoutes);
app.use("/api/v1", productRoutes);
app.get("*", routeNotFound);

//---------------------Error middlewares
app.use(middlewareErr);

//----------------------Server
app.listen(PORT, () => {
  console.log(`Listening in: ${BaseURL}`);
});
