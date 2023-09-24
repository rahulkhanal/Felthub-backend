const express = require("express");
const upload = require("../multer");
const { addBanner } = require("../controllers/banner");
const tokenVarification = require("../utils/tokenVarification");
const Router = express.Router();

Router.post(
  "/create-banner",
  tokenVarification,
  upload.single("file"),
  addBanner
);

module.exports = {
  bannerRoutes: Router,
};
