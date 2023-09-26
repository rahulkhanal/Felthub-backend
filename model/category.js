module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      Name: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return category;
};
