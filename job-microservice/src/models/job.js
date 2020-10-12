module.exports = (sequelize, Sequelize) => {
  const Job = sequelize.define('Job', {
    jobId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT(11),
    },
    professorId: {
      allowNull: false,
      type: Sequelize.BIGINT(11),
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    position: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    company: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    experience: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    workplace: {
      allowNull: false,
      type: Sequelize.STRING
    },
    creationDate: {
      allowNull: false,
      type: Sequelize.DATEONLY
    },
    closeDate: {
      allowNull: true,
      type: Sequelize.DATEONLY
    },
    isRemote: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    isActive: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    }
  });

  Job.associate = function associate(models) {
    Job.hasMany(models.Subscription, { as: 'subscription', foreignKey: 'jobId' });
    Job.hasMany(models.CourseRequirement, { as: 'courseRequirement', foreignKey: 'jobId' });
  };

  return Job;
};
