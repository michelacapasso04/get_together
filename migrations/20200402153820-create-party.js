"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Parties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      owner: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      wines: {
        type: Sequelize.JSONB,
      },
      beers: {
        type: Sequelize.JSONB,
      },
      cocktails: {
        type: Sequelize.JSONB,
      },
      apiRecipes:{
        type: Sequelize.JSONB,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      finishDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Parties");
  },
};
