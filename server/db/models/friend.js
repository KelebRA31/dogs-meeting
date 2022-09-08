const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Friend.init({
    friend1: DataTypes.INTEGER,
    friend2: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};
