module.exports = (sequelize, DataTypes) => {
  const attributeValue = sequelize.define(
    "attributeValue",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return attributeValue;
};
