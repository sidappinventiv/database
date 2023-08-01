'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('catagories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subcategories: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE.now(),
        allowNull: false,
        defaultValue: Date,
      },
      updatedAt: {
        type: Sequelize.DATE.now(),
        allowNull: false,
        defaultValue: Date,
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  },
};
