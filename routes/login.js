const express = require("express");
const { loginCompany } = require("../controllers/auth/login");
const Router = express.Router();

Router.post("/login-company", loginCompany);

module.exports = {
  loginRoutes: Router,
};
