const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");

const addDocument = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { file } = req;
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler("Document name is not defined", 400));
  }
  if (!file) {
    return next(new ErrorHandler("Image not found", 400));
  }
  const filePath = file?.path;
  const data = await db.document.create({
    name: name,
    image: filePath,
    companyID: loginedUser,
  });
  resp.status(200).json(data);
});

module.exports = { addDocument };
