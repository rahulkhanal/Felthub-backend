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

const db = {};
db.company = require("./company")(sequelize, DataTypes);
db.credintial = require("./credintial")(sequelize, DataTypes);

module.exports = sequelize;