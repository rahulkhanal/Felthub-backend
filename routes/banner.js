const express = require("express");
const upload = require("../multer");
const { addBanner } = require("../controllers/banner");
const Router = express.Router();

Router.post("/create-banner", upload.single("file"), addBanner);

module.exports = {
  bannerRoutes: Router,
};
