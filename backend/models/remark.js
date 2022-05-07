'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Remark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Remark.belongsTo(models.User, {
        foreignKey: {
          allowNull: true
        },
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      })

      models.Remark.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      })
    }
  }
  Remark.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Remark',
  });
  return Remark;
};