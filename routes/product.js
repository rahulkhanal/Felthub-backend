const express = require("express");
const upload = require("../multer");
const tokenVerification = require("../middlewares/tokenVerification");
const { addProduct } = require("../controllers/product");
const Router = express.Router();

Router.post(
  "/create-product",
  tokenVerification,
  //   upload.single("file"),
  addProduct
);

module.exports = {
  productRoutes: Router,
};
