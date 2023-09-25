
module.exports = (sequelize, DataTypes) => {
  const banner = sequelize.define(
    "banner",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      heading: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      //same table name as schema
      freezeTableName: true,
    }
  );
  return banner;
};
