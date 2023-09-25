const express = require("express");
const upload = require("../multer");
const tokenVerification = require("../middlewares/tokenVerification");
const {
  addDocument,
  readDocument,
  deleteDocument,
} = require("../controllers/document");
const Router = express.Router();

Router.post(
  "/add-document",
  tokenVerification,
  upload.single("file"),
  addDocument
);
Router.get("/get-document", tokenVerification, readDocument);
Router.delete("/delete-document/:id", tokenVerification, deleteDocument);

module.exports = {
  documentRoutes: Router,
};
