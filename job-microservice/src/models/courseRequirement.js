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
      type: Sequelize.ENUM(['Administração', 'Ciência da Computação', 'Ciências Atmosféricas', 'Ciências Biológicas Licenciatura', 'Engenharia Ambiental', 'Engenharia Civil',
        'Engenharia de Bioprocessos','Engenharia de Computação','Engenharia de Controle e Automação','Engenharia de Energia','Engenharia de Materiais','Engenharia de Produção',
        'Engenharia Elétrica', 'Engenharia Eletrônica', 'Engenharia Hídrica', 'Engenharia Mecânica', 'Engenharia Mecânica Aeronáutica', 'Engenharia Química', 'Física Bacharelado',
        'Física Licenciatura','Matemática Bacharelado','Matemática Licenciatura','Química Bacharelado','Química Licenciatura','Sistemas de Informação']),
    },
  });

  CourseRequirement.associate = function associate(models) {
    CourseRequirement.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
  };

  return CourseRequirement;
};
