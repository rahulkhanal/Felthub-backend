const express = require("express");
const upload = require("../multer");
const { addBanner, getBanner, deleteBanner } = require("../controllers/banner");
const tokenVerification = require("../middlewares/tokenVerification");
const Router = express.Router();

Router.post(
  "/create-banner",
  tokenVerification,
  upload.single("file"),
  addBanner
);
Router.get("/get-banner", tokenVerification, getBanner);

Router.delete("/delete-banner/:id", tokenVerification, deleteBanner);

module.exports = {
  bannerRoutes: Router,
};
