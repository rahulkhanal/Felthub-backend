const express = require("express");
const { addCompany } = require("../controllers/company");
const Router = express.Router();

Router.post("/create-company", addCompany);

module.exports = {
  companyRoutes: Router,
};
