const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middlewares/err/async-err");
const ErrorHandler = require("../errors/custom-err");
const db = require("../model/connection");
const secretKey = process.env.SECRET_KEY;
const { company, credintial } = db;

module.exports = catchAsyncError(async (req, resp, next) => {
  const token = req.header("Authorization");
  if (!token) {
    next(new ErrorHandler("Authentication Failed", 401));
  } else {
    const decodedToken = await jwt.verify(token, secretKey);
    if (!decodedToken) {
      next(new ErrorHandler("Token verification failed", 401));
    } else {
      const data = await credintial.findOne({
        where: {
          id: decodedToken.userId,
        },
      });
      const data2 = await company.findOne({
        where: {
          id: data.companyID,
        },
        include: [
          {
            model: credintial,
            attributes: ["email"],
          },
        ],
      });
      req.loginedUser = data2.id;
      // await resp.status(200).json({ message: "Valid Token", data2 });
      next();
    }
  }
});
