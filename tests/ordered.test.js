const { personTest, addressTest } = require('../person-microservice/tests/person');
const { userTest, authTest } = require('../authentication-microservice/tests/auth');

personTest();
addressTest();
userTest();
authTest();
