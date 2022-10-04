const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Gender, { foreignKey: 'gender_id' });
      this.belongsTo(models.Temper, { foreignKey: 'temper_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      // this.hasMany(models.Meeting, { foreignKey: 'dog_id_creator' });
      // this.hasMany(models.User_on_meeting, { foreignKey: 'dog_id' });
    }
  }
  Dog.init({
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.SMALLINT,
    img: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    gender_id: DataTypes.INTEGER,
    temper_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Dog',
  });
  return Dog;
};
