const express = require("express");
const { loginCompany, authorizedUser } = require("../controllers/auth/login");
const tokenVerification = require("../middlewares/tokenVerification");
const Router = express.Router();

Router.post("/login-company", loginCompany);
Router.get("/authorized-user", tokenVerification, authorizedUser);

module.exports = {
  loginRoutes: Router,
};
