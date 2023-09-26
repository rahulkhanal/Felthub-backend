const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");
const { company, credintial, category } = db;

//create company
const addCategory = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { name, status } = req.body;
  const { file } = req;
  const filePath = file?.path || null;
  if (!name) {
    return next(new ErrorHandler("Insufficient Credintial"));
  }
  const data = await category.create({
    Name: name,
    image: filePath,
    status,
    companyID: loginedUser,
  });
  resp.status(201).json(data);
});

//delete APIs
const deleteCategory = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { id } = req.params;
  const existingUser = await category.findAll({
    where: {
      id,
      companyID: loginedUser,
    },
  });
  if (!existingUser) {
    return next(new ErrorHandler("Invalid Category", 400));
  }
  const data = await category.destroy({
    where: {
      id,
      companyID: loginedUser,
    },
  });
  if (data > 0) {
    resp.status(200).json({ message: "Deleted successfully", data });
  } else {
    next(new ErrorHandler("Invalid Category", 400));
  }
});

//read APIs
const readCategory = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const data = await category.findAll({
    where: {
      companyID: loginedUser,
    },
  });
  resp.status(200).json(data);
});

module.exports = { addCategory, deleteCategory, readCategory };
