const ErrorHandler = require("../errors/custom-err");
const db = require("../model/connection");
const { company, credintial } = db;
const bcrypt = require("bcryptjs");

const loginCompany = async (req, resp, next) => {};

module.exports = { loginCompany };
