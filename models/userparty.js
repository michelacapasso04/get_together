"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserParty = sequelize.define(
    "UserParty",
    {
      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      PartyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {},
    {}
  );
  UserParty.associate = function (models) {
    // associations can be defined here
    UserParty.belongsTo(models.User, { foreignKey: "UserId" });
    UserParty.belongsTo(models.Party, { foreignKey: "PartyId" });
  };
  this.newInvitation = async function (user, party) {
    return await this.create({ UserId: user, PartyId: party }); // combina build e save( che la carica nel db)
  };

  this.refuse = async function (user, party) {
    let tuple = this.findAll({
      where: {
        UserId: user,
        PartyId: party,
      },
    });
    return await tuple.destroy();
  }
  return UserParty;
};
