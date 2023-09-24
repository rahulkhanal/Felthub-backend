const express = require("express");
const { addCompany } = require("../controllers/company");
const Router = express.Router();

Router.post("/login-company", addCompany);

module.exports = {
  loginRoutes: Router,
};
