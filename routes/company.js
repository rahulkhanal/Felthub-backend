const express = require("express");
const {
  addCompany,
  deleteCompany,
  getCompany,
} = require("../controllers/company");
const upload = require("../multer");
const tokenVerification = require("../middlewares/tokenVerification");
const Router = express.Router();

Router.post("/create-company", upload.single("file"), addCompany);
Router.delete("/delete-company/:id", tokenVerification, deleteCompany);
Router.get("/get-company/:id", tokenVerification, getCompany);

module.exports = {
  companyRoutes: Router,
};
