const request = require('supertest');
const app = require('../app');

jest.mock('../models/Post', () => {
  return {
    find: () => Promise.reject()
  }
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

afterAll(async () => {
  require('../helpers/redis').disconnect();
});

describe('test /posts endpoint', () => {
  test.only('failed to get posts', done => {
    request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
