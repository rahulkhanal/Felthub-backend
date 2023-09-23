module.exports = (sequelize, DataTypes) => {
  const credintial = sequelize.define(
    "credintial",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return credintial;
};
