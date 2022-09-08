const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Temper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Dog, { foreignKey: 'temper_id' });
    }
  }
  Temper.init({
    temper: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Temper',
  });
  return Temper;
};
