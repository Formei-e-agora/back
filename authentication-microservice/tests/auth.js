const request = require('supertest');
// const db = require('../src/models');

const user = {
  userId: 1,
  username: 'marcel',
  password: 'Marcel123',
  userType: 1,
  eligibleEmail: true,
  eligiblePush: false,
};

const userTest = () => describe('User Test', () => {
  beforeAll(async (next) => {
    // await db.sequelize.sync({ alter: true, force: true });
    next();
  });
  const userId = 1;

  // it('should create a user', (done) => {
  //   request('localhost:8000')
  //     .post('/user/create')
  //     .send(user)
  //     .end((err, res) => {
  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body).toHaveProperty('Status');
  //       expect(res.body.Status).toBe(true);
  //       expect(res.body).toHaveProperty('userData');
  //       expect(res.body.userData).toHaveProperty('userId');
  //       userId = res.body.userData.userId;

  //       done();
  //     });
  // });

  it('should verify if a user exists', (done) => {
    request('localhost:8000')
      .get(`/user/verify/userId/${userId}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);

        done();
      });
  });

  // it('should update a user', (done) => {
  //   user.eligiblePush = true;
  //   request('localhost:8000')
  //     .put(`/user/update/${userId}`)
  //     .send(user)
  //     .end((err, res) => {
  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body).toHaveProperty('Status');
  //       expect(res.body.Status).toBe(true);
  //       expect(res.body).toHaveProperty('userData');
  //       expect(res.body.userData).toBe(1);

  //       done();
  //     });
  // });

  it('should find a user', (done) => {
    request('localhost:8000')
      .get(`/user/find/userId/${userId}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('userData');
        expect(res.body.userData).toHaveProperty('userId');
        expect(res.body.userData.userId).toEqual(userId);
        expect(res.body.userData).toHaveProperty('eligiblePush');
        // expect(res.body.userData.eligiblePush).toBe(true);

        done();
      });
  });
});

const authTest = () => describe('Auth Test', () => {
  const userId = 1;
  const loginInfo = {
    username: 'marcel',
    password: 'Marcel123',
  };

  it('should login', (done) => {
    request('localhost:8000')
      .post('/user/login')
      .send(loginInfo)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('userData');
        expect(res.body.userData).toHaveProperty('userId');
        expect(res.body.userData.userId).toBe(userId);
        done();
      });
  });

  it('should update password', (done) => {
    const password = {
      userId,
      password: 'Marcel123',
      newPassword: 'NovaSenha123',
    };
    request('localhost:8000')
      .put('/user/update/password')
      .send(password)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('userData');
        expect(res.body.userData).toBe(1);

        done();
      });
  });

  it('should unlock user', (done) => {
    request('localhost:8000')
      .put(`/user/unlock/userId/${userId}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);

        done();
      });
  });

  const resetInfo = {
    username: 'marcel',
    email: 'marcelnogueirasgs@gmail.com',
  };

  it('should reset password', (done) => {
    request('localhost:8000')
      .post('/user/reset/password')
      .send(resetInfo)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        done();
      });
  });
});

// const deleteAuthTest = () => describe('Delete Test', () => {
//   const userId = 1;
//   it('should delete an user', (done) => {
//     request('localhost:8000')
//       .delete(`/user/delete/${userId}`)
//       .end((err, res) => {
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('Status');
//         expect(res.body.Status).toBe(true);

//         done();
//       });
//   });
// });

afterAll((done) => {
  // db.sequelize.close();
  done();
});

module.exports = {
  userTest,
  authTest,
  // deleteAuthTest,
};
