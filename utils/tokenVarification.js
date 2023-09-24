const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middlewares/err/async-err");
const ErrorHandler = require("../errors/custom-err");
const secretKey = process.env.SECRET_KEY;

module.exports = catchAsyncError(async (req, resp, next) => {
  const token = req.header("Authorization");
  if (!token) {
    next(new ErrorHandler("Authentication Failed", 401));
  } else {
    const decodedToken = await jwt.verify(token, secretKey);
    if (!decodedToken) {
      next(new ErrorHandler("Token verification failed", 401));
    } else {
      resp.status(200).json({ message: "Valid token" });
      next();
    }
  }
});
