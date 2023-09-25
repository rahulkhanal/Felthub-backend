const express = require("express");
const tokenVerification = require("../middlewares/tokenVerification");
const {
  addSocial,
  deleteSocial,
  readSocial,
  updateSocial,
} = require("../controllers/social");
const Router = express.Router();

Router.post("/add-sociallink", tokenVerification, addSocial);
Router.delete("/delete-sociallink/:id", tokenVerification, deleteSocial);
Router.get("/read-sociallink", tokenVerification, readSocial);
Router.patch("/update-sociallink/:id", tokenVerification, updateSocial);

module.exports = {
  socialRoutes: Router,
};
