'use strict';

const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@gmail.com',
      password_hash: await bcryptjs.hash('A123456', 8),
      level: '1',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Armando',
      lastName: 'Passos',
      email: 'passos@hotmail.com',
      password_hash: await bcryptjs.hash('B123456', 8),
      level: '2',
      status: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'John3',
      lastName: 'Doe3',
      email: 'example3@uol.com',
      password_hash: await bcryptjs.hash('C123456', 8),
      level: '2',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
