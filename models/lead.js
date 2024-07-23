'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define('Lead', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  }, {});
  return Lead;
};