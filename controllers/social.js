const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");

//create social link
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

//get api for social
const readSocial = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const data = await db.social.findAll({
    where: {
      companyID: loginedUser,
    },
  });
  resp.status(200).json(data);
});

//delete api for social
const deleteSocial = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { id } = req.params;
  const data = await db.social.destroy({
    where: {
      companyID: loginedUser,
      id,
    },
  });
  if (data > 0) {
    resp.status(200).json({ Message: "Delete successfully", data });
  } else {
    next(new ErrorHandler("Invalid social link", 400));
  }
});

//update social link
const updateSocial = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { id } = req.params;
  const { name, Link } = req.body;
  const data = await db.social.update(
    { name, Link },
    {
      where: {
        companyID: loginedUser,
        id,
      },
    }
  );
  resp.status(200).json(data);
});

module.exports = { addSocial, readSocial, deleteSocial, updateSocial };
