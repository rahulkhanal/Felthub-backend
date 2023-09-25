const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");

const addTeam = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  const { file } = req;
  const { name, position } = req.body;
  console.log(req.body);
  if (!name || !position) {
    return next(new ErrorHandler("Insufficient Credintial", 400));
  }
  const filePath = file?.path || null;
  const data = await db.team.create({
    name: name,
    profile: filePath,
    position: position,
    companyID: loginedUser,
  });
  resp.status(200).json(data);
});

module.exports = { addTeam };
