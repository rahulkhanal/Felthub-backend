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

//--------------models object
const db = {};
db.sequelize = sequelize;
db.company = require("./company")(sequelize, DataTypes);
db.credintial = require("./credintial")(sequelize, DataTypes);
db.banner = require("./banner")(sequelize, DataTypes);
db.document = require("./document")(sequelize, DataTypes);
db.team = require("./team")(sequelize, DataTypes);
db.social = require("./social")(sequelize, DataTypes);
db.category = require("./category")(sequelize, DataTypes);
db.product = require("./product")(sequelize, DataTypes);
db.description = require("./description")(sequelize, DataTypes);
db.attribute = require("./attribute")(sequelize, DataTypes);
db.attributeValue = require("./attributeValue")(sequelize, DataTypes);
db.pricing = require("./pricing")(sequelize, DataTypes);

//---------------relations
db.company.hasOne(db.credintial, {
  foreignKey: "companyID",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
}); //one-to-one relation
db.company.hasMany(db.banner, {
  foreignKey: "companyID",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
}); //one-to-many relation
db.company.hasMany(db.document, {
  foreignKey: "companyID",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
}); //one-to-many relation
db.company.hasMany(db.team, {
  foreignKey: "companyID",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
}); //one-to-many relation
db.company.hasMany(db.social, {
  foreignKey: "companyID",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
}); //one-to-many relation
db.company.hasMany(db.category, {
  foreignKey: "companyID",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
}); //one-to-many relation
db.company.hasMany(db.product, {
  foreignKey: "companyID",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
}); //one-to-many relation

//-----------------------------------
db.category.hasOne(db.product, {
  foreignKey: "categoryID",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

//-----------------------------------

//sync model
db.sequelize.sync({ force: false });

module.exports = db;
