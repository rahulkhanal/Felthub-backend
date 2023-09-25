const express = require("express");
const upload = require("../multer");
const { addBanner } = require("../controllers/banner");
const tokenVerification = require("../middlewares/tokenVerification");
const Router = express.Router();

Router.post(
  "/create-banner",
  tokenVerification,
  upload.single("file"),
  addBanner
);

module.exports = {
  bannerRoutes: Router,
};
