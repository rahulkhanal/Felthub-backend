module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define(
    "document",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return document;
};
