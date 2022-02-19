const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const app = require('../app');
const { createToken } = require('../helpers/jwt');

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({}),
}));

let access_token = '';

const invalid_id = '620f55de92e0babea2ccb10a';

let post_one = {
  place_id: '6210cc70bf599130a9a9c40f',
  user_id: '620f55de92e0babea2ccb10a',
  caption: 'Test caption food',
  tags: ['test', 'success', 'failed'],
  // images: [testImage]
  images: [
    'https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/621021b010577cdc8447bfee/img-1.jpg',
  ],
};

let edit_post = { caption: 'caption yg sudah di edit' };

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost', { useNewUrlParser: true });

  await Post.deleteMany({});

  const user = await User.findOne({ email: 'user.one@mail.com' });

  access_token = createToken({
    id: user._id,
    name: user.username,
    email: user.email,
  });

  const test_post = await Post.create(post_one);
  post_one.id = test_post._id;
});

describe('test /posts endpoint', () => {
  test('successfully CREATE post', done => {
    request(app)
      .post('/posts')
      .send(post_one)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));

        done();
      });
  });

  // done
  test('successfully GET ALL posts', done => {
    request(app)
      .get('/posts')
      // .set('access_token', access_token)
      .send(post_one)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toBeInstanceOf(Array);

        done();
      });
  });

  // done
  test('successfully GET post BY ID', done => {
    request(app)
      .get(`/posts/${post_one.id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));

        done();
      });
  });

  // done
  test('successfully EDIT post BY ID', done => {
    request(app)
      .put(`/posts/${post_one.id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .send(edit_post)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));

        done();
      });
  });

  //done
  test('successfully DELETE post BY ID', done => {
    request(app)
      .delete(`/posts/${post_one.id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty(
          'message',
          'Post has been deleted successfully.'
        );

        done();
      });
  });

  // ===== failed =====

  // done
  test('failed to GET post BY ID (wrong id)', done => {
    request(app)
      .get('/posts/620f55de92e0babea2ccb10a')
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'Data not found');
        done();
      });
  });

  // done
  test('failed EDIT post (wrong id)', done => {
    request(app)
      .put(`/posts/${invalid_id}`)
      .send(post_one)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'Data not found');

        done();
      });
  });

  // done
  test('failed DELETE post (wrong id)', done => {
    request(app)
      .delete(`/posts/${invalid_id}`)
      .send(post_one)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('message', 'Data not found');

        done();
      });
  });

  // done
  test('failed CREATE post (no access_token)', done => {
    request(app)
      .post('/posts')
      .send(post_one)
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
  test('failed EDIT post (no access_token)', done => {
    request(app)
      .put(`/posts/${post_one.id}`)
      .send(post_one)
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
  test('failed DELETE post (no access_token)', done => {
    request(app)
      .delete(`/posts/${post_one.id}`)
      .send(post_one)
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
