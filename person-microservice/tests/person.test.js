const request = require('supertest');
const db = require('../src/models');
const server = require('../src');


describe('Person Test', () => {
  beforeAll(async (next) => {
    await db.sequelize.sync({ alter: true, force: true });
    next();
  });

  let person = {
    personalId: '123.456.789-10',
    name: 'Marcel',
    lastName: 'Mendes',
    phone: '(11) 1111-1111',
    email: 'email@email.com',
  }
  
  let personId;
  
  it('should create a person', (done) => {
    request(server)
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
  
  it(`should verify if a person exists`, (done) => {
    request(server)
    .get(`/person/verify/personId/${personId}`)
    .end((err, res) => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Status');
      expect(res.body.Status).toBe(true);
      
      done();
    });
  });
  
  it(`should find all people`, (done) => {
    request(server)
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
    person.lastName = 'Nogueira'
    request(server)
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
  
  it(`should find a person ${personId}`, (done) => {
    request(server)
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
});

describe('Address Test', () => {
  let address = {
    personId: 1,
    address: 'Rua 3',
    complementaryAddress: 'bloco b',
    number: '1',
    district: 'Centro',
    postalCode: '37490-000',
    city: 'Itajubá',
    state: 'MG',
    country: 'Brasil',
  }

  let addressId;
  
  it('should create an address', (done) => {
    request(server)
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
  
  it(`should verify if an address exists`, (done) => {
    request(server)
    .get(`/person/address/verify/addressId/${addressId}`)
    .end((err, res) => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Status');
      expect(res.body.Status).toBe(true);
      
      done();
    });
  });
  
  it('should update an address', (done) => {
    address.address = 'AV BPS'
    request(server)
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
  
  it(`should find an address ${addressId}`, (done) => {
    request(server)
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

describe('Delete Test', () => {
  it(`should delete an address`, (done) => {
    request(server)
    .delete(`/person/address/delete/1`)
    .end((err, res) => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Status');
      expect(res.body.Status).toBe(true);
      
      done();
    });
  });

  it(`should delete a person`, (done) => {
    request(server)
    .delete(`/person/delete/1`)
    .end((err, res) => {
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Status');
      expect(res.body.Status).toBe(true);
      
      done();
    });
  });
});

afterAll(done => {
  db.sequelize.close();
  server.close()
  done();
})