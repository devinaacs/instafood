const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/User');
const { createToken } = require('../helpers/jwt');

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({}),
}));

const app = require('../app');

let userOne = {
  username: 'user.one',
  email: 'user.one@mail.com',
  password: '12345aaa',
};

let userTwo = {
  username: 'user.two',
  email: 'user.two@mail.com',
  password: '12345aaa',
};

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost', { useNewUrlParser: true });

  await User.deleteMany({});

  const createdUserOne = await User.create(userOne);
  userOne.id = createdUserOne.id;

  const createdUserTwo = await User.create(userTwo);
  userTwo.id = createdUserTwo.id;
});

describe('test /users endpoint', () => {
  test('successfully registering user', done => {
    const user = {
      username: 'new.user',
      email: 'new.user@mail.com',
      password: '12345aaa',
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
        res.body.forEach(v => {
          expect(v).toHaveProperty('username', expect.any(String));
          expect(v).not.toHaveProperty('email');
          expect(v).not.toHaveProperty('password');
        });

        done();
      });
  });

  test('successfully get user by id', done => {
    const payload = {
      id: userOne.id,
      name: userOne.username,
      email: userOne.email,
    };

    const token = createToken(payload);

    request(app)
      .get(`/users/${userOne.id}`)
      .set('Accept', 'application/json')
      .set('access_token', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toHaveProperty('id', expect.any(String));
        expect(res.body).toHaveProperty('username', expect.any(String));
        expect(res.body).toHaveProperty('email', expect.any(String));
        expect(res.body).not.toHaveProperty('password');

        done();
      });
  });

  test('failed to register new user (empty username)', (done) => {
    request(app)
      .post('/register')
      .send({
        username: "",
        email: "test@mail.com",
        password: "sukses"
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", {
          "username": "Username is required"
        });
        done();
      })
  })

  test('failed to register new user (empty email)', (done) => {
    request(app)
      .post('/register')
      .send({
        username: "test.user",
        email: "",
        password: "sukses"
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", {
          "email": "Email is required"
        });
        done();
      })
  })

  test('failed to register new user (empty password)', (done) => {
    request(app)
      .post('/register')
      .send({
        username: "test.user",
        email: "test@mail.com",
        password: ""
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", {
          "password": "Password is required"
        });
        done();
      })
  })

  test('failed to register new user (invalid email format)', (done) => {
    request(app)
      .post('/register')
      .send({
        username: "test.user",
        email: "test@mail.com@",
        password: "sukses"
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", {
          "email": "Invalid email format"
        });
        done();
      })
  })

  test('failed to register new user (password length less than 6)', (done) => {
    request(app)
      .post('/register')
      .send({
        username: "test.user",
        email: "test@mail.com",
        password: "test"
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", {
          "password": "Length of the password should be between 6-1000"
        });
        done();
      })
  })

  test('failed to register new user (username is taken)', (done) => {
    request(app)
      .post('/register')
      .send({
        username: "user.one",
        email: "test@mail.com",
        password: "sukses"
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", "Username must be unique");
        done();
      })
  })

  test('failed to register new user (email is taken)', (done) => {
    request(app)
      .post('/register')
      .send({
        username: "test.one",
        email: "user.one@mail.com",
        password: "sukses"
      })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) { return done(err) };

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", "Email must be unique");
        done();
      })
  })

  test('failed to login user (invalid email/passwod)', (done) => {
    const loginData = {
      email: userOne.email,
      password: "sukses",
    };

    request(app)
      .post('/login')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, res) => {
        if (err) { return done(err) };

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", "invalid email/password");
        done();
      })
  })

  test('failed to login user (invalid email/passwod)', (done) => {
    const loginData = {
      email: "test@mail.com",
      password: userOne.password,
    };

    request(app)
      .post('/login')
      .send(loginData)
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, res) => {
        if (err) { return done(err) };

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", "invalid email/password");
        done();
      })
  })


  test('failed to get user by id (data not found)', (done) => {
    request(app)
      .get('/users/621019c5e5ca7105f04d5566')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) { return done(err) };

        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body).toHaveProperty("message", "Data not found");
        done();
      })
  })
});
