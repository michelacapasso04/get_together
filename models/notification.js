'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    source: {
      type: DataTypes.INTEGER,
      primaryKey: false,},
    destination: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    comment: DataTypes.INTEGER,
    event: DataTypes.STRING,
    party: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.User, { foreignKey: "source", as: "sourceUser" });
    Notification.belongsTo(models.User, { foreignKey: "destination",  });
  };
  return Notification;
};