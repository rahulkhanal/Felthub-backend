const express = require("express");
const Router = express.Router();

Router.get("/", (req, resp) => {
  resp.send({
    message: "Hello, you are visitng felthub website",
    developer: "Rahul Khanal",
    linkedin: "https://www.linkedin.com/in/rahul-khanal-b0a627210/",
    github: "https://github.com/rahulkhanal",
  });
});

module.exports = {
  userRoutes: Router,
};
