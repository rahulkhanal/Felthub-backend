const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");
const BaseURL = require("../utils/config");

const addBanner = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { heading } = req.body;
  const { file } = req;
  if (!file) {
    return next(new ErrorHandler("Image not found", 400));
  }
  const filePath = file?.path;
  const data = await db.banner.create({
    image: filePath,
    heading,
    companyID: loginedUser,
  });
  resp.status(200).json(data);
});

const getBanner = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;

  const data = await db.banner.findAll({
    where: { companyID: loginedUser },
  });
  const modifiedData = await data.map((document) => ({
    id: document.id,
    title: document.heading,
    image: `${BaseURL}/${document.image}`,
  }));
  resp.status(200).json(modifiedData);
});

const deleteBanner = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { id } = req.params;
  const data = await db.banner.destroy({
    where: { companyID: loginedUser, id: id },
  });

  if (data > 0) {
    resp.status(200).json({ Message: "Delete successfully", data });
  } else {
    next(new ErrorHandler("Invalid banner", 400));
  }
});

module.exports = { addBanner, getBanner, deleteBanner };
