const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");

const addSocial = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { name, Link } = req.body;
  console.log(name, Link);
  if (!name || !Link) {
    return next(new ErrorHandler("Insufficient Credintial", 400));
  }
  const data = await db.social.create({
    name: name,
    Link,
    companyID: loginedUser,
  });
  resp.status(200).json({ message: "Success", data });
});

module.exports = { addSocial };
