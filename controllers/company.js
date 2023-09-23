const ErrorHandler = require("../errors/custom-err");
const db = require("../model/connection");
const { company, credintial } = db;
const bcrypt = require("bcryptjs");

const addCompany = async (req, resp, next) => {
  const { name, profile, address, email, password } = req.body;
  if (!name || !address || !email || !password) {
    return next(new ErrorHandler("Insufficient Credintial", 400));
  }
  const existingUser = await credintial.findOne({
    where: {
      email: email,
    },
  });
  if (existingUser && email) {
    return next(new ErrorHandler("User already exist", 400));
  }
  const data = await company.create({ name, profile, address });
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
    if (err) {
      next(new ErrorHandler("Error in hashing Password", 400));
    } else {
      const { id } = data;
      const data2 = await credintial.create({
        companyID: id,
        email,
        password: hashedPassword,
      });
      return resp.status(200).json({ ...data, ...data2 });
    }
  });
};
module.exports = { addCompany };
