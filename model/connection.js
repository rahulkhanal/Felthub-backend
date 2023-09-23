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

//models object
const db = {};
db.company = require("./company")(sequelize, DataTypes);
db.credintial = require("./credintial")(sequelize, DataTypes);

//relations
db.company.hasOne(db.credintial, { onUpdate: "CASCADE", onDelete: "RESTRICT" }); //one-to-one relation

module.exports = sequelize;
