const request = require('supertest');

const personTest = () => describe('Person Test', () => {
  const person = {
    personalId: '123.456.789-10',
    name: 'Marcel',
    lastName: 'Mendes',
    phone: '(11) 1111-1111',
    email: 'marcelnogueirasgs@gmail.com',
    username: 'marcel',
    password: 'Marcel123',
    userType: 1,
    eligibleEmail: true,
    eligiblePush: false,
  };

  let personId;

  it('should create a person', (done) => {
    request('localhost:8001')
      .post('/person/create')
      .send(person)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('personData');
        expect(res.body).toHaveProperty('personData.personId');
        personId = res.body.personData.personId;

        done();
      });
  });

  it('should verify if a person exists', (done) => {
    request('localhost:8001')
      .get(`/person/verify/personId/${personId}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);

        done();
      });
  });

  it('should find all people', (done) => {
    request('localhost:8001')
      .get('/person/find/all')
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('people');
        expect(Array.isArray(res.body.people)).toBe(true);
        // expect(res.body.people).toContain(person);

        done();
      });
  });

  it('should update a person', (done) => {
    person.lastName = 'Nogueira';
    person.userType = 2;
    delete person.eligiblePush;
    request('localhost:8001')
      .put(`/person/update/${personId}`)
      .send(person)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('personData');
        expect(res.body.personData).toBe(1);

        done();
      });
  });

  it('should find a person by id', (done) => {
    request('localhost:8001')
      .get(`/person/find/personId/${personId}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('personData');
        expect(res.body.personData).toHaveProperty('personId');
        expect(res.body.personData.personId).toEqual(personId);
        expect(res.body.personData).toHaveProperty('lastName');
        expect(res.body.personData.lastName).toBe('Nogueira');

        done();
      });
  });

  it('should find a person by email', (done) => {
    request('localhost:8001')
      .get(`/person/find/email/${person.email}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('personData');
        expect(res.body.personData).toHaveProperty('personId');
        expect(res.body.personData.personId).toEqual(personId);
        expect(res.body.personData).toHaveProperty('email');
        expect(res.body.personData.email).toBe('marcelnogueirasgs@gmail.com');

        done();
      });
  });
});

const addressTest = () => describe('Address Test', () => {
  const address = {
    personId: 1,
    address: 'Rua 3',
    complementaryAddress: 'bloco b',
    number: '1',
    district: 'Centro',
    postalCode: '37490-000',
    city: 'Itajubá',
    state: 'MG',
    country: 'Brasil',
  };

  let addressId;

  it('should create an address', (done) => {
    request('localhost:8001')
      .post('/person/address/create')
      .send(address)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('addressData');
        expect(res.body).toHaveProperty('addressData.addressId');
        addressId = res.body.addressData.addressId;
        done();
      });
  });

  it('should verify if an address exists', (done) => {
    request('localhost:8001')
      .get(`/person/address/verify/addressId/${addressId}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);

        done();
      });
  });

  it('should update an address', (done) => {
    address.address = 'AV BPS';
    request('localhost:8001')
      .put(`/person/address/update/${addressId}`)
      .send(address)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('addressData');
        expect(res.body.addressData).toBe(1);

        done();
      });
  });

  it('should find an address', (done) => {
    request('localhost:8001')
      .get(`/person/address/find/addressId/${addressId}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Status');
        expect(res.body.Status).toBe(true);
        expect(res.body).toHaveProperty('addressData');
        expect(res.body.addressData).toHaveProperty('addressId');
        expect(res.body.addressData.addressId).toEqual(addressId);
        expect(res.body.addressData).toHaveProperty('address');
        expect(res.body.addressData.address).toBe('AV BPS');

        done();
      });
  });
});

// const deletePersonTest = () => describe('Delete Test', () => {
//   it('should delete an address', (done) => {
//     request('localhost:8001')
//       .delete('/person/address/delete/1')
//       .end((err, res) => {
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('Status');
//         expect(res.body.Status).toBe(true);

//         done();
//       });
//   });

//   it('should delete a person', (done) => {
//     request('localhost:8001')
//       .delete('/person/delete/1')
//       .end((err, res) => {
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('Status');
//         expect(res.body.Status).toBe(true);

//         done();
//       });
//   });
// });

module.exports = {
  personTest,
  addressTest,
  // deletePersonTest,
};
