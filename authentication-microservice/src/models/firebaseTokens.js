module.exports = (sequelize, DataTypes) => {
  const FirebaseToken = sequelize.define('FirebaseTokens', {
    tokenId: {
      type: DataTypes.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.BIGINT(11),
      references: { model: 'Users', key: 'userId' },
    },
    firebaseToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return FirebaseToken;
};
