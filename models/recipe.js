'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    readyInMinutes: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    sourceUrl: DataTypes.STRING,
    dishTypes: DataTypes.JSONB ,//arary json
    cuisines: DataTypes.JSONB ,//array json
    diets: DataTypes.JSONB,//array json
    summary: DataTypes.JSONB,
    extendedIngredients: DataTypes.JSONB,//array di json,
    analyzedInstructions: DataTypes.JSONB,
    leng: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsToMany(models.Party, {through: 'PartyRecipe', foreingKey: "RecipeId"});
    Recipe.belongsTo(models.User);
  };
  return Recipe;
};