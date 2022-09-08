const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(
        models.User,
        { as: 'friend1', through: 'Friends', foreignKey: 'friend1' },
      );
      this.belongsToMany(
        models.User,
        { as: 'friend2', through: 'Friends', foreignKey: 'friend2' },
      );
      this.belongsToMany(models.Meeting, { foreignKey: 'user_id', through: 'Messages' });
      this.belongsToMany(models.Meeting, { foreignKey: 'user_id', through: 'Users_on_meeting' });
      this.hasMany(models.Dog, { foreignKey: 'user_id' });
      this.belongsTo(models.Gender, { foreignKey: 'gender_id' });
      this.hasMany(models.Meeting, { foreignKey: 'user_id_creator' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    img: DataTypes.STRING,
    age: DataTypes.SMALLINT,
    gender_id: DataTypes.INTEGER,
    nickName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
