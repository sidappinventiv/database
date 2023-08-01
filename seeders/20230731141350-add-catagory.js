'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
      return queryInterface.bulkInsert('catagories', [{
        id: '1',
        catagory_name: 'electronics',
        subcatagories:'mobile',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('catagories', null, {});
    }
  };



 