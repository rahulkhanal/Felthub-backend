const express = require("express");
const tokenVerification = require("../middlewares/tokenVerification");
const { addAttribute, getAttribute } = require("../controllers/attribute");
const Router = express.Router();

Router.post("/create-attribute", tokenVerification, addAttribute);
Router.get("/get-attribute", tokenVerification, getAttribute);

module.exports = {
  attributeRoutes: Router,
};
