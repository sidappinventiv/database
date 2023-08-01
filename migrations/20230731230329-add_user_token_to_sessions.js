'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Sessions', 'user_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Sessions', 'user_token');
  },
};

