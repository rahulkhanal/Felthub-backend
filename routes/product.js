const express = require("express");
const upload = require("../multer");
const tokenVerification = require("../middlewares/tokenVerification");
const {
  addProduct,
  getProduct,
  deleteProduct,
} = require("../controllers/product");
const Router = express.Router();

Router.post(
  "/create-product",
  tokenVerification,
  upload.single("file"),
  addProduct
);

Router.get("/get-products", tokenVerification, getProduct);
Router.delete("/delete-product/:id", tokenVerification, deleteProduct);

module.exports = {
  productRoutes: Router,
};
