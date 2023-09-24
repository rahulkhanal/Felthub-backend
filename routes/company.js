const express = require("express");
const { addCompany } = require("../controllers/company");
const upload = require("../multer");
const Router = express.Router();

Router.post("/create-company", upload.single("file"), addCompany);

module.exports = {
  companyRoutes: Router,
};
