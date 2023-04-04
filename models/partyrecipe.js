"use strict";
module.exports = (sequelize, DataTypes) => {
  const PartyRecipe = sequelize.define('PartyRecipe', {
    PartyId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  PartyRecipe.associate = function(models) {
    PartyRecipe.belongsTo(models.Party);
    PartyRecipe.belongsTo(models.Recipe,{onDelete:'cascade'});
  };
  return PartyRecipe;
};
