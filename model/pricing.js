module.exports = (sequelize, DataTypes) => {
  const pricing = sequelize.define(
    "pricing",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      price: {
        type: DataTypes.STRING,
      },
      discount: {
        type: DataTypes.STRING,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return pricing;
};
