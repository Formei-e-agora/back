module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define('Address', {
    addressId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT(11),
    },
    // personId: {
    //   allowNull: false,
    //   type: Sequelize.BIGINT(11),
    //   references: { model: 'Persons', key: 'personId' },
    // },
    address: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    complementaryAddress: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    number: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    district: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    postalCode: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    city: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    state: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    country: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  });

  Address.associate = function associate(models) {
    Address.belongsTo(models.Person, { foreignKey: 'personId', as: 'person' });
  };

  return Address;
};
