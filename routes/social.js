const express = require("express");
const tokenVerification = require("../middlewares/tokenVerification");
const { addSocial } = require("../controllers/social");
const Router = express.Router();

Router.post("/add-sociallink", tokenVerification, addSocial);

module.exports = {
  socialRoutes: Router,
};
