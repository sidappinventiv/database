'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  address.init({
    address_line1: DataTypes.STRING,
    address_line2: DataTypes.STRING,
    landmark: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    address_type: DataTypes.ENUM,
    zip_code: DataTypes.NUMBER,
    country: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    user_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};