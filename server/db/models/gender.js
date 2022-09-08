const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { foreignKey: 'gender_id' });
      this.hasMany(models.Dog, { foreignKey: 'gender_id' });
    }
  }
  Gender.init({
    Gender: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Gender',
  });
  return Gender;
};
