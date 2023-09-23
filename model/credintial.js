module.exports = (sequelize, DataTypes) => {
  const credintial = sequelize.define(
    "credintial",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      companyID: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return credintial;
};
