const ErrorHandler = require("../errors/custom-err");
module.exports = {
  homePage: (req, resp) => {
    resp.send({
      message: "Hello, you are visitng felthub website",
      developer: "Rahul Khanal",
      linkedin: "https://www.linkedin.com/in/rahul-khanal-b0a627210/",
      github: "https://github.com/rahulkhanal",
    });
  },
  onlyJson: (req, res, next) => {
    const contentType = req.headers["content-type"];
    if (contentType && contentType.toLowerCase() === "application/json") {
      next();
    } else {
      next(new ErrorHandler("Invalid Content-Type.", 400));
    }
  },
};
