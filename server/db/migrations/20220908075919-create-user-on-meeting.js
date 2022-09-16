module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_on_meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      meeting_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Meetings',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      // dog_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Dogs',
      //     key: 'id',
      //   },
      //   onDelete: 'cascade',
      //   allowNull: false,
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_on_meetings');
  },
};
