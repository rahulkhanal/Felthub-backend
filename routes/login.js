const express = require("express");
const { loginCompany } = require("../controllers/auth/login");
const tokenVarification = require("../utils/tokenVarification");
const Router = express.Router();

Router.post("/login-company", loginCompany);
Router.post("/verify-token", tokenVarification);

module.exports = {
  loginRoutes: Router,
};
