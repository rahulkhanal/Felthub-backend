const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");

//create api
const addAttribute = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { type } = req.body;
  if (!type) {
    return next(new ErrorHandler("insufficient credential", 400));
  }
  const data = await db.attribute.create({
    type,
    companyID: loginedUser,
  });
  resp.status(200).json({ message: "Successfully inserted", data });
});

//read api
const getAttribute = catchAsyncError(async (req, resp, next) => {
  const data = await db.attribute.findAll({});
  resp.status(200).json(data);
});
module.exports = { addAttribute, getAttribute };
