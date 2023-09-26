const express = require("express");
const upload = require("../multer");
const tokenVerification = require("../middlewares/tokenVerification");
const {
  addCategory,
  deleteCategory,
  readCategory,
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

module.exports = {
  categoryRoutes: Router,
};
