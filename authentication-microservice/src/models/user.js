const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    userId: {
      type: DataTypes.BIGINT(11),
      autoIncrement: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sparePassword: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    loginAttempts: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    eligibleEmail: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    eligiblePush: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeCreate((user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null,
    );
  });

  User.beforeUpdate((user) => {
    if (user.attributes.password) {
      // eslint-disable-next-line no-param-reassign
      user.attributes.password = bcrypt.hashSync(
        user.attributes.password,
        bcrypt.genSaltSync(10),
        null,
      );
    }
  });

  User.beforeBulkUpdate((user) => {
    if (user.attributes.password) {
      // eslint-disable-next-line no-param-reassign
      user.attributes.password = bcrypt.hashSync(
        user.attributes.password,
        bcrypt.genSaltSync(10),
        null,
      );
    }
  });
  return User;
};
