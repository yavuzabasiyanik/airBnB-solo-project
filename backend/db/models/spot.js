'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    bedNum: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER
  }, {});
  Spot.associate = function(models) {
    Spot.belongsTo(models.User, { foreignKey: 'userId' , onDelete: "cascade", foreignKeyConstraint: true })
    Spot.hasMany(models.Booking, { foreignKey: 'spotId',onDelete: "cascade", foreignKeyConstraint: true})
    Spot.hasMany(models.Review, { foreignKey: 'spotId',onDelete: "cascade", foreignKeyConstraint: true})
    Spot.hasMany(models.Image, { foreignKey: 'spotId',onDelete: "cascade", foreignKeyConstraint: true})
  };
  return Spot;
};
