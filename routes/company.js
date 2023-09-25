const express = require("express");
const {
  addCompany,
  deleteCompany,
  getCompany,
  updateCompanyDetail,
  updateCompanyProfile,
  updateCompanyCredintial,
} = require("../controllers/company");
const upload = require("../multer");
const tokenVerification = require("../middlewares/tokenVerification");
const Router = express.Router();

Router.post("/create-company", upload.single("file"), addCompany);
Router.delete("/delete-company/:id", tokenVerification, deleteCompany);
Router.get("/get-company/:id", tokenVerification, getCompany);
Router.patch(
  "/update-company-detail/:id",
  tokenVerification,
  updateCompanyDetail
);
Router.patch(
  "/update-company-profile/:id",
  tokenVerification,
  upload.single("file"),
  updateCompanyProfile
);
Router.patch(
  "/update-company-credential/:id",
  tokenVerification,
  updateCompanyCredintial
);

module.exports = {
  companyRoutes: Router,
};
