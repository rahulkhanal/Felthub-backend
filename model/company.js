module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define(
    "company",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      profile: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return company;
};
