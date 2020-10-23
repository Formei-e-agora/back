module.exports = (sequelize, Sequelize) => {
  const Person = sequelize.define('Person', {
    personId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT(11),
    },
    personalId: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    phone: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    course: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    isEligible: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    },
    isAdmin: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    },
    department: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  });

  Person.associate = function associate(models) {
    Person.hasOne(models.Address, { as: 'address', foreignKey: 'personId' });
  };

  return Person;
};
