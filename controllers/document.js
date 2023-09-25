const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");
const BaseURL = require("../utils/config");

//add document
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

//read document
const readDocument = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;

  const data = await db.document.findAll({
    where: { companyID: loginedUser },
  });
  const modifiedData = data.map((document) => ({
    id: document.id,
    image: `${BaseURL}/${document.image}`,
  }));
  resp.status(200).json(modifiedData);
});

//delete document
const deleteDocument = catchAsyncError(async (req, resp, next) => {
  const { id } = req.params;
  const existingUser = await db.document.findOne({
    where: {
      id: id,
    },
  });
  if (!existingUser) {
    return next(new ErrorHandler("Invalid document"));
  }
  const data = await db.document.destroy({
    where: {
      id: id,
    },
  });
  return resp.status(200).json({ data });
});

module.exports = { addDocument, readDocument, deleteDocument };
