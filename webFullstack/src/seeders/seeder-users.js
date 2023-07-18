'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: 123456,
      firstName: 'Xuan',
      lastName: 'Dang',
      address: "Ha Noi",
      gender: 1,
      image: "http://image",
      phonenumber: "038986123",
      positionId: "Ha Noi",
      roleId: "ROLE",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
