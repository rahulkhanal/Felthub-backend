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
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      resp.status(200).json({ message: "Login success", token });
    }
  }
});

module.exports = { loginCompany };
