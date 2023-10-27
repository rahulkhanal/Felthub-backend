const catchAsyncError = require("../../middlewares/err/async-err");
const db = require("../../model/connection");
const { company, credintial } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../../errors/custom-err");
const secretKey = process.env.SECRET_KEY;

//controller logic
const loginCompany = catchAsyncError(async (req, resp, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Insufficient Credintial", 400));
  } else {
    const user = await credintial.findOne({
      where: {
        email: email,
      },
    });

    // Check if the user exists
    if (!user) {
      return next(new ErrorHandler("Invalid Email", 400));
    } else {
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return next(new ErrorHandler("Invalid Password", 400));
      }
      // Generate a JWT token
      const token = jwt.sign({ userId: user.companyID }, secretKey, {
        expiresIn: "300d",
      });
      resp.status(200).json({ message: "Login success", token });
    }
  }
});

const authorizedUser = catchAsyncError(async (req, resp, next) => {
  const loginedUser = req.loginedUser;
  if (!loginedUser) {
    return next(new ErrorHandler("No user is loginned yet", 400));
  }
  const data = await credintial.findOne({
    where: {
      id: loginedUser,
    },
  });
  const authorised = await company.findOne({
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
  await resp.status(200).json({ authorised });
});
module.exports = { loginCompany, authorizedUser };
