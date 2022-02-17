const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const { createToken } = require('../helpers/jwt');

let userOne = {
  username: 'user.one',
  email: 'user.one@mail.com',
  password: '12345aaa',
  imageUrl: 'http://image.com/profile.jpg',
};

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost', { useNewUrlParser: true });

  await User.deleteMany({});

  const createdUserOne = await User.create(userOne);
  userOne.id = createdUserOne.id;
});

describe('test /users endpoint', () => {
  test('successfully registering user', done => {
    const user = {
      username: 'new.user',
      email: 'new.user@mail.com',
      password: '12345aaa',
      imageUrl: 'http://image.com/profile.jpg',
    };

    request(app)
      .post('/register')
      .send(user)
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toHaveProperty('access_token', expect.any(String));

        done();
      });
  });

  test('successfully login', done => {
    const loginData = {
      email: userOne.email,
      password: userOne.password,
    };

    request(app)
      .post('/login')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toHaveProperty('access_token', expect.any(String));

        done();
      });
  });

  test('successfully get list of users', done => {
    const payload = {
      id: userOne.id,
      name: userOne.username,
      email: userOne.email,
    };

    const token = createToken(payload);

    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toBeInstanceOf(Array);

        done();
      });
  });
});
