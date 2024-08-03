'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { message: '名称已经存在，请选择其他名称。' },
      validate: {
        notNull: {
          message: '名称必须填写。'
        },
        notNull: {
          message: '名称不能为空。'
        },
        len: {
          args: [2, 45],
          message: '长度必须在2到45个字符之间。'
        }
      }
    },

    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { message: "排序必须填写。" },
        notEmpty: { message: "排序不能为空。" },
        isInt: { message: '排序必须为整数。' },
        isPositive(value) {
          if (value <= 0) {
            throw new Error("排序必须为正数。");
          }
        }
      }
    }

  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};