const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({}),
}));

let place_ref_test = 'ChIJj9vzoKX2aS4RF3EGNHjn2tU';
let search_resto = { name: 'Bebek BKB' };

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost', { useNewUrlParser: true });
});

describe.skip('test places endpoint', () => {
  // done
  test('successfully GET ALL places', done => {
    request(app)
      .get('/places')
      .query(search_resto)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        expect(res.body).toBeInstanceOf(Array);

        done();
      });
  });

  // done
  test('successfully GET places BY place_ref', done => {
    request(app)
      .get(`/places/${place_ref_test}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));

        done();
      });
  });
});
