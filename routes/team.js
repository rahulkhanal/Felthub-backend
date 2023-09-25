const express = require("express");
const tokenVerification = require("../middlewares/tokenVerification");
const { addTeam } = require("../controllers/team");
const Router = express.Router();

Router.post("/add-team", tokenVerification, addTeam);

module.exports = {
  teamRoutes: Router,
};
