const ErrorHandler = require("../errors/custom-err");
const db = require("../model/connection");
const { company } = db;

const addCompany = async (req, resp, next) => {
  const { name, profile, address } = req.body;
  if (!name || !profile || !address) {
    return next(new ErrorHandler("Insufficient Credintial", 400));
  }
  const data = await company.create({ name, profile, address });
  return resp.status(200).json(data);
};
module.exports = { addCompany };
