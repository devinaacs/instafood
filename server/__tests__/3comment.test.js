const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const app = require('../app');
const { createToken } = require('../helpers/jwt');

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({}),
}));

let access_token = '';
let newcomment = {
  comment: 'new comment',
};

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

  await Comment.deleteMany({});

  const user = await User.findOne({ email: 'user.one@mail.com' });
  post_one.user = user._id;
  newcomment.user = user._id;

  access_token = createToken({
    id: user._id,
    email: user.email,
  });

  const test_post = await Post.create(post_one);
  post_one._id = test_post._id;

  newcomment.post_id = post_one._id;
  newcomment.post = post_one._id;

  const test_comment = await Comment.create(newcomment);
  newcomment._id = test_comment._id;
});

// afterAll(async () => {
//   await mongoose.disconnect();
//   require('../helpers/redis').disconnect();
// });

describe.skip('test /comments endpoint', () => {
  // done
  test('successfully CREATE comment', done => {
    request(app)
      .post('/comments')
      .send(newcomment)
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
            comment: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            __v: 0,
          })
        );

        done();
      });
  });

  // done
  test('successfully GET ALL comments', done => {
    request(app)
      .get('/comments')
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            user: expect.any(String),
            post: expect.any(String),
            comment: expect.any(String),
          })
        );

        done();
      });
  });

  // done
  test('successfully GET comments BY POST ID', done => {
    request(app)
      .get(`/comments/${newcomment.post_id}`)
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
            comment: expect.any(String),
          })
        );

        done();
      });
  });

  //done
  test('successfully DELETE comments BY ID', done => {
    request(app)
      .delete(`/comments/${newcomment._id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty(
          'message',
          'Comment has been deleted successfully.'
        );

        done();
      });
  });

  // ===== failed =====

  // done
  test('failed GET comments BY POST ID (wrong post id)', done => {
    request(app)
      .get(`/comments/${invalid_id}`)
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
  test('failed DELETE comments (wrong post id)', done => {
    request(app)
      .delete(`/comments/${invalid_id}`)
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
  test('failed GET comments BY POST ID (wrong post id)', done => {
    request(app)
      .get(`/comments/${invalid_id}`)
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
  test('failed DELETE comments (wrong post id)', done => {
    request(app)
      .delete(`/comments/${invalid_id}`)
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
