const ErrorHandler = require("../errors/custom-err");
const catchAsyncError = require("../middlewares/err/async-err");
const db = require("../model/connection");
const { company, credintial } = db;
const bcrypt = require("bcryptjs");

//create company
const addCompany = catchAsyncError(async (req, resp, next) => {
  const { name, address, email, password } = req.body;
  const { file } = req;
  const filePath = file?.path || null;
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
  const data = await company.create({ name, profile: filePath, address });
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
});

const deleteCompany = catchAsyncError(async (req, resp, next) => {
  const { id } = req.params;
  const existingUser = await company.findOne({
    where: {
      id: id,
    },
  });
  console.log(existingUser);
  if (existingUser) {
    const data = await company.destroy({
      where: {
        id: id,
      },
    });
    return resp.status(200).json({ data });
  }
});

const getCompany = catchAsyncError(async (req, resp, next) => {
  const { id } = req.params;
  console.log(id);
  const data = await company.findOne({
    where: {
      id: id,
    },
  });
  if (!data) {
    return next(new ErrorHandler("Invalid company", 400));
  }
  const authorized = await company.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: credintial,
        attributes: ["email"],
      },
    ],
  });
  await resp.status(200).json({ authorized });
});

const updateCompanyDetail = async (req, resp, next) => {
  const { id } = req.params;
  const { name, address } = req.body;
  const data = await company.update(
    { name, address },
    {
      where: {
        id: id,
      },
    }
  );
  resp.status(200).json({ message: "Updated Sucessfully", data });
};

const updateCompanyProfile = async (req, resp, next) => {
  const { id } = req.params;
  const { file } = req;
  const filePath = file?.path || null;
  const data = await company.update(
    { profile: filePath },
    {
      where: {
        id: id,
      },
    }
  );
  resp.status(200).json({ message: "Updated Sucessfully", data });
};

const updateCompanyCredintial = async (req, resp, next) => {
  const { id } = req.params;
  const { email, oldpassword, newpassword } = req.body;
  if (oldpassword && newpassword && email) {
    const existingUser = await credintial.findOne({
      where: {
        companyID: id,
      },
    });
    if (email !== existingUser.email) {
      return next(ErrorHandler("Email doesn't match", 400));
    }
    const passwordMatch = await bcrypt.compareSync(
      oldpassword,
      existingUser.password
    );
    if (!passwordMatch) {
      return next(new ErrorHandler("Password doesn't match", 400));
    } else {
      const saltRounds = 10;
      bcrypt.hash(newpassword, saltRounds, async (err, hashedPassword) => {
        if (err) {
          next(new ErrorHandler("Error in hashing Password", 400));
        } else {
          const data = await credintial.update(
            {
              password: hashedPassword,
            },
            {
              where: {
                companyID: id,
              },
            }
          );
          return resp.status(200).json({ data });
        }
      });
    }
  } else {
    next(ErrorHandler("Insufficient Credential", 400));
  }
};

module.exports = {
  addCompany,
  deleteCompany,
  getCompany,
  updateCompanyDetail,
  updateCompanyProfile,
  updateCompanyCredintial,
};
