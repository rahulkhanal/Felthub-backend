const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middlewares/err/async-err");
const ErrorHandler = require("../errors/custom-err");
const db = require("../model/connection");
const secretKey = process.env.SECRET_KEY;

module.exports = catchAsyncError(async (req, resp, next) => {
  const token = req.header("Authorization");
  if (!token) {
    next(new ErrorHandler("Authentication token failed", 401));
  } else {
    const decodedToken = await jwt.verify(token, secretKey);
    if (!decodedToken) {
      return next(new ErrorHandler("Token verification failed", 401));
    } else {
      const id = decodedToken.userId;
      const data = await db.company.findOne({
        where: {
          id: id,
        },
      });
      if (!data) {
        return next(new ErrorHandler("Unathorized request", 401));
      }
      req.loginedUser = data.id;
      next();
    }
  }
});
