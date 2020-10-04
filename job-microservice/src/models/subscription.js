module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define('Subscription', {
    subscriptionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT(11),
    },
    jobId: {
      allowNull: false,
      type: Sequelize.BIGINT(11),
      references: { model: 'Jobs', key: 'jobId' },
    },
    studentId: {
      allowNull: false,
      type: Sequelize.BIGINT(11),
    },
    isRecommended: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    }
  });

  Subscription.associate = function associate(models) {
    Subscription.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
  };

  return Subscription;
};
