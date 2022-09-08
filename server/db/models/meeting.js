const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id_creator' });
      this.belongsToMany(models.User, { foreignKey: 'meeting_id', through: 'Messages' });
      this.belongsToMany(models.User, { foreignKey: 'meeting_id', through: 'Users_on_meeting' });
    }
  }
  Meeting.init({
    location: DataTypes.STRING,
    comment: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    private: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    user_id_creator: DataTypes.INTEGER,
    dog_id_creator: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Meeting',
  });
  return Meeting;
};
