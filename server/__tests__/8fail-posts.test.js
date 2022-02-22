const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Post = require('../models/Post');
const User = require('../models/User');
const { createToken } = require('../helpers/jwt');

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

let access_token = '';

let post_one = {
  place_id: '6210cc70bf599130a9a9c40f',
  caption: 'Test caption food',
  tags: ['test', 'success', 'failed']
};


beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/instafood-test-8fail-post', {
    useNewUrlParser: true,
  });

  await User.deleteMany({});

  const user = await User.create({
    username: 'user.one',
    email: 'user.one@mail.com',
    password: '12345aaa',
  });
  post_one.user = user._id;

  access_token = createToken({
    id: user._id,
    email: user.email,
  });

});

afterAll(async () => {
  require('../helpers/redis').disconnect();
});

describe('test /posts endpoint', () => {
  test('failed to get posts', done => {
    request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  test('failed to CREATE posts', done => {
    request(app)
      .post('/posts')
      .field('place_id', post_one.place_id)
      .field('caption', post_one.caption)
      .field('tags', post_one.tags[0])
      .attach('images', '../server/assets/BebekBkb.jpg')
      .set('access_token', access_token)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'internal server error');
        done();
      });
  });
});
