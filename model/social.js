module.exports = (sequelize, DataTypes) => {
  const social = sequelize.define(
    "social",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return social;
};
