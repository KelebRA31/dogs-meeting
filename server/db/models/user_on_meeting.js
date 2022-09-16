const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_on_meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Meeting, { foreignKey: 'meeting_id' });
    }
  }
  User_on_meeting.init({
    user_id: DataTypes.INTEGER,
    meeting_id: DataTypes.INTEGER,
    // dog_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User_on_meeting',
  });
  return User_on_meeting;
};
