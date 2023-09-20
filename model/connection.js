const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("felthub", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
  logging: false, //hide message in terminal
});

try {
  sequelize.authenticate();
  console.log("Database connection successfull.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
