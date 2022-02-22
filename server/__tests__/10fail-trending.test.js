const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const app = require('../app');

jest.mock('../actions/trendingVersion', () => {
  return {
    readyVersion: () => Promise.reject({ name: 'unexpected error' }),
  };
});

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({
    upload(a, b, c) {
      c(null, {
        makePublic(c2) {
          c2(null);
        },
        publicUrl() {
          return 'image';
        },
      });
    },
  }),
}));

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/instafood-test-10trend', {
    useNewUrlParser: true,
  });
});

afterAll(async () => {
  require('../helpers/redis').disconnect();
  Post.deleteMany({});
  await mongoose.disconnect();
});

describe('test /trending', () => {
  test('GET /trending/posts - failed to GET TRENDING POSTS', done => {
    request(app)
      .get('/trending/posts')
      .set('Accept', 'application/json')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'internal server error');
        done();
      });
  });

  test('GET /trending/places - failed to GET TRENDING PLACES', done => {
    request(app)
      .get('/trending/places')
      .set('Accept', 'application/json')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'internal server error');
        done();
      });
  });

  test('failed to GET TRENDING POSTS', done => {
    request(app)
      .get('/trending/tags')
      .set('Accept', 'application/json')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'internal server error');
        done();
      });
  });
});
