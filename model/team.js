module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define(
    "team",
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
      profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      position: { type: DataTypes.STRING, allowNull: false },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return team;
};
