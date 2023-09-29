module.exports = (sequelize, DataTypes) => {
  const description = sequelize.define(
    "description",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        type: DataTypes.TEXT,
        unique: true,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return description;
};
