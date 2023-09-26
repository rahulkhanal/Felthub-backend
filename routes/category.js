const express = require("express");
const upload = require("../multer");
const tokenVerification = require("../middlewares/tokenVerification");
const {
  addCategory,
  deleteCategory,
  readCategory,
  updateCategory,
} = require("../controllers/category");
const Router = express.Router();

Router.post(
  "/add-category",
  upload.single("file"),
  tokenVerification,
  addCategory
);
Router.delete("/delete-category/:id", tokenVerification, deleteCategory);
Router.get("/get-category", tokenVerification, readCategory);
Router.patch(
  "/update-category/:id",
  upload.single("file"),
  tokenVerification,
  updateCategory
);

module.exports = {
  categoryRoutes: Router,
};
