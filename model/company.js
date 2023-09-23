module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define(
    "company",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return company;
};
