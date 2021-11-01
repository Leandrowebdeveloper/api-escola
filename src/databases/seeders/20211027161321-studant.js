'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Studants', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      age: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Armando',
      lastName: 'Passos',
      email: 'passos@example.com',
      age: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'John3',
      lastName: 'Doe3',
      email: 'example3@example.com',
      age: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Studants', null, {});

  }
};
