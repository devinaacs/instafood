const request = require('supertest');
const axios = require('axios');
const redis = require('../helpers/redis');
const app = require('../app');

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({
    upload(a, b, c) {
      c(null, {
        makePublic(c2) {
          c2(null);
        },
        publicUrl() {
          return 'https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/6212b5edde2f72451b3865c3/img-1.jpg';
        },
      });
    },
  }),
}));

jest.mock('axios');
jest.mock('../helpers/redis');

beforeEach(() => {
  jest.resetAllMocks();
});

afterAll(async () => {
  require('../helpers/redis').disconnect();
});

describe('test places endpoint', () => {
  test('GET /places - successfully get cached result', done => {
    redis.get.mockResolvedValue([
      {
        place_id: 'place id',
        name: 'place name',
        address: 'place address',
        icon: 'place icon',
        photo_reference: 'photo reference'
      }
    ]);

    request(app)
      .get('/places')
      .query({ name: 'Bebek BKB' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            place_id: expect.any(String),
            name: expect.any(String),
            address: expect.any(String),
            icon: expect.any(String),
            photo_reference: expect.any(String),
          })
        );

        done();
      });
  });

  test('GET /places/:id - successfully get cached result', done => {
    redis.get.mockResolvedValue({
      name: 'place name',
      address: 'place address',
      icon: 'place icon',
      photos: ['photo reference']
    });

    request(app)
      .get('/places/testid')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            address: expect.any(String),
            icon: expect.any(String),
            photos: expect.any(Array),
          })
        );

        done();
      });
  });

  test('internal server error when GET /places', done => {
    redis.get.mockRejectedValue({ name: 'unexpected error' });

    request(app)
      .get('/places')
      .query({ name: 'Bebek BKB' })
      .set('Accept', 'application/json')
      .expect(500)
      .end(err => {
        if (err) done(err);
        else done();
      });
  });

  test('internal server error when GET /places/:id', done => {
    axios.get.mockRejectedValue({ name: 'unexpected error' });

    request(app)
      .get('/places/testid')
      .set('Accept', 'application/json')
      .expect(500)
      .end(err => {
        if (err) done(err);
        else done();
      });
  });

  test('internal server error when GET /places/photo', done => {
    axios.get.mockRejectedValue({ name: 'unexpected error' });

    request(app)
      .get('/places/photo')
      .set('Accept', 'application/json')
      .expect(500)
      .end(err => {
        if (err) done(err);
        else done();
      });
  });
});
