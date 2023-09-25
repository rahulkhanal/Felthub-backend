const express = require("express");
const tokenVerification = require("../middlewares/tokenVerification");
const { addTeam } = require("../controllers/team");
const upload = require("../multer");
const Router = express.Router();

Router.post("/add-team", tokenVerification, upload.single("file"), addTeam);

module.exports = {
  teamRoutes: Router,
};
