const express = require("express");
const upload = require("../multer");
const tokenVerification = require("../middlewares/tokenVerification");
const { addDocument } = require("../controllers/document");
const Router = express.Router();

Router.post(
  "/add-document",
  tokenVerification,
  upload.single("file"),
  addDocument
);

module.exports = {
  documentRoutes: Router,
};
