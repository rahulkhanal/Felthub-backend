module.exports = (sequelize, DataTypes) => {
    const attribute = sequelize.define(
      "attribute",
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        type: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        //same table name as schema
        freezeTableName: true,
      }
    );
    return attribute;
  };
  