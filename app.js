require("dotenv").config();
const Express = require("express");
const app = Express();
var bodyParser = require("body-parser");
const middlewareErr = require("./middlewares/err/middleware-err");
const BaseURL = require("./utils/config");
const { userRoutes } = require("./routes/user");
const sequelize = require("./model/connection");

//sync model
sequelize.sync({ force: true });

//crusial middlewares
app.use(bodyParser.json());

//Declartion
const PORT = process.env.PORT || 9000;

//API Routes
app.get("/", (req, resp) => {
  resp.send({
    message: "Hello, you are visitng felthub website",
    developer: "Rahul Khanal",
    linkedin: "https://www.linkedin.com/in/rahul-khanal-b0a627210/",
    github: "https://github.com/rahulkhanal",
  });
});
app.use("/", userRoutes);

//error middlewares
app.use(middlewareErr);

//server
app.listen(PORT, () => {
  console.log(`Listening in: ${BaseURL}`);
});
