"use strict";
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      idfb: DataTypes.STRING,
      accessToken: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.belongsToMany(User, {
      as: "Friends",
      through: "Friendships",
      foreignKey: "UserId",
    });
    User.belongsToMany(models.Party, {
      through: "UserParty",
      foreignKey: "UserId",
    });
    User.hasMany(models.Comment, { foreignKey: "UserId" });
    User.hasMany(models.Recipe, { foreignKey: "UserId" });

    User.hasMany(models.Notification, { foreignKey: "source", as: "sourceUser" });
    User.hasMany(models.Notification, { foreignKey: "destination" });
  };

  //class method
  User.addHook("beforeCreate", (user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  //instance Methods
  User.prototype.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.prototype.stringa = function () {
    return this.firstName;
  };
  return User;
};
