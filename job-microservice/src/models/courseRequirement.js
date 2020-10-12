module.exports = (sequelize, Sequelize) => {
  const CourseRequirement = sequelize.define('CourseRequirement', {
    courseRequirementId: {
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
    course: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  });

  CourseRequirement.associate = function associate(models) {
    CourseRequirement.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
  };

  return CourseRequirement;
};
