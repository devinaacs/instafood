const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Like = require('../models/Like');
const User = require('../models/User');
const app = require('../app');
const { createToken } = require('../helpers/jwt');

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({}),
}));

let access_token = '';
let newlike = {};

const invalid_id = '620f55de92e0babea2ccb10a';

let post_one = {
  place_id: '6210cc70bf599130a9a9c40f',
  caption: 'Test caption food from comment test',
  tags: ['test', 'success', 'failed'],
  // images: [testImage]
  images: [
    'https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/621021b010577cdc8447bfee/img-1.jpg',
  ],
};

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost', { useNewUrlParser: true });

  await Like.deleteMany({});

  const user = await User.findOne({ email: 'user.one@mail.com' });
  post_one.user = user._id;
  newlike.user = user._id;

  access_token = createToken({
    id: user._id,
    email: user.email,
  });

  const test_post = await Post.create(post_one);
  post_one._id = test_post._id;

  newlike.post_id = post_one._id;
  newlike.post = post_one._id;

  const test_like = await Like.create(newlike);
  newlike._id = test_like._id;
});

// afterAll(async () => {
//   await mongoose.disconnect();
//   require('../helpers/redis').disconnect();
// });

describe.skip('test /likes endpoint', () => {
  // done
  test('successfully CREATE like', done => {
    request(app)
      .post('/likes')
      .send(newlike)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            user: expect.any(String),
            post: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            __v: 0,
          })
        );

        done();
      });
  });

  // done
  test('successfully GET all likes', done => {
    request(app)
      .get('/likes')
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            user: expect.any(String),
            post: expect.any(String),
          })
        );

        done();
      });
  });

  // done
  test('successfully GET likes BY POST ID', done => {
    request(app)
      .get(`/likes/${newlike.post_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            user: expect.any(String),
            post: expect.any(String),
          })
        );

        done();
      });
  });

  //done
  test('successfully DELETE likes BY ID', done => {
    request(app)
      .delete(`/likes/${newlike._id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'Unliked this post.');

        done();
      });
  });

  // ===== failed =====

  // done
  test('failed GET likes BY POST ID (wrong post id)', done => {
    request(app)
      .get(`/likes/${invalid_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toHaveProperty('message', 'Data not found');

        done();
      });
  });

  // done
  test('failed DELETE likes (wrong post id)', done => {
    request(app)
      .delete(`/likes/${invalid_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toHaveProperty('message', 'Data not found');

        done();
      });
  });

  // done
  test('failed GET likes BY POST ID (no access token)', done => {
    request(app)
      .get(`/likes/${invalid_id}`)
      .set('Accept', 'application/json')
      // .set('access_token', access_token)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'invalid token');

        done();
      });
  });

  // done
  test('failed DELETE likes (no access token)', done => {
    request(app)
      .delete(`/likes/${invalid_id}`)
      .set('Accept', 'application/json')
      // .set('access_token', access_token)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'invalid token');

        done();
      });
  });
});
