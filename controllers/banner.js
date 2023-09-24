const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");

const addBanner = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { file } = req;
  if (!file) {
    return next(new ErrorHandler("Image not found", 400));
  }
  const filePath = file?.path;
  console.log(filePath, loginedUser);
  const data = await db.banner.create({
    image: filePath,
    companyID: loginedUser,
  });
  resp.status(200).json(data);
});

module.exports = { addBanner };
