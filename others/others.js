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
    if (
      contentType?.toLowerCase() === "application/json" ||
      contentType?.slice(0, 19) === "multipart/form-data"
    ) {
      next();
    } else {
      next(new ErrorHandler("Invalid Content-Type.", 400));
    }
  },
  routeNotFound: (req, resp) => {
    resp.status(404).send({
      message: "Invalid Route",
    });
  },
};
