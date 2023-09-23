module.exports = (sequelize, DataTypes) => {
  const credintial = sequelize.define(
    "credintial",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
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
