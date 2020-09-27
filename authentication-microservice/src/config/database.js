require('dotenv').config({ path: `${__dirname}/../../.env` });

module.exports = {
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    logging: false,
    force: false,
  },
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    logging: false,
    force: false,
  },
  test: {
    username: 'formeieagora',
    password: '5$ogF1p%zKA',
    database: 'formeieagora',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    force: true,
  },
};
