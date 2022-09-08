module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const tempersArr = [{
      temper: 'Активный',
    },
    {
      temper: 'Нейтральный',
    },
    {
      temper: 'Спокойный',
    }];
    await queryInterface.bulkInsert('Tempers', tempersArr, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tempers', null, {});
  },
};
