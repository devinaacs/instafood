const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const app = require('../app');
const { createToken } = require('../helpers/jwt');

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

const invalid_id = '620f55de92e0babea2ccb10a';

let post_one = {
  place_id: '6210cc70bf599130a9a9c40f',
  caption: 'Test caption food',
  tags: ['test', 'success', 'failed']
};

const edit_post = { caption: 'caption yg sudah di edit' };

let page_query = {
  place_id: '',
  user_id: '',
  tag: '',
  page_size: '',
  page_number: '',
};

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/instafood-test-2post', {
    useNewUrlParser: true,
  });

  await User.deleteMany({});
  await Post.deleteMany({});

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

  const test_post = await Post.create(post_one);
  post_one._id = test_post._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  require('../helpers/redis').disconnect();
});

describe('test /posts endpoint', () => {
  test('successfully CREATE post', done => {
    request(app)
      .post('/posts')
      .field('place_id', post_one.place_id)
      .field('caption', post_one.caption)
      .field('tags', post_one.tags[0])
      .attach('images', '../server/assets/BebekBkb.jpg')
      .set('access_token', access_token)
      .expect(201)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            user: expect.any(String),
            place_id: expect.any(String),
            caption: expect.any(String),
            images: expect.any(Array),
            tags: expect.any(Array),
            created_at: expect.any(String),
            id: expect.any(String),
          })
        );

        done();
      });
  });

  test('successfully GET ALL posts (without query)', done => {
    request(app)
      .get('/posts')
      .send(post_one)
      .query(page_query)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            pages_count: expect.any(Number),
            items: expect.any(Array),
          })
        );
        expect(res.body.items[0]).toEqual(expect.any(Object));
        expect(res.body.items[0]).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            place_id: expect.any(String),
            user: expect.any(Object),
            caption: expect.any(String),
            images: expect.any(Array),
            tags: expect.any(Array),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            likes: expect.any(Array),
            comments: expect.any(Array),
          })
        );

        done();
      });
  });

  // done
  test('successfully GET ALL posts (with query place_id)', done => {
    page_query.place_id = post_one.place_id;
    request(app)
      .get('/posts')
      .send(post_one)
      .query(page_query)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            pages_count: expect.any(Number),
            items: expect.any(Array),
          })
        );
        expect(res.body.items[0]).toEqual(expect.any(Object));
        expect(res.body.items[0]).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            place_id: expect.any(String),
            user: expect.any(Object),
            caption: expect.any(String),
            images: expect.any(Array),
            tags: expect.any(Array),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            likes: expect.any(Array),
            comments: expect.any(Array),
          })
        );

        done();
      });
  });

  // done
  test('successfully GET ALL posts (with query user_id)', done => {
    page_query.user_id = post_one.user;
    request(app)
      .get('/posts')
      .send(post_one)
      .query(page_query)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            pages_count: expect.any(Number),
            items: expect.any(Array),
          })
        );
        expect(res.body.items[0]).toEqual(expect.any(Object));
        expect(res.body.items[0]).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            place_id: expect.any(String),
            user: expect.any(Object),
            caption: expect.any(String),
            images: expect.any(Array),
            tags: expect.any(Array),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            likes: expect.any(Array),
            comments: expect.any(Array),
          })
        );

        done();
      });
  });

  // done
  test('successfully GET ALL posts (with query tag)', done => {
    page_query.tag = post_one.tags[0];
    request(app)
      .get('/posts')
      .send(post_one)
      .query(page_query)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            pages_count: expect.any(Number),
            items: expect.any(Array),
          })
        );
        expect(res.body.items[0]).toEqual(expect.any(Object));
        expect(res.body.items[0]).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            place_id: expect.any(String),
            user: expect.any(Object),
            caption: expect.any(String),
            images: expect.any(Array),
            tags: expect.any(Array),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            likes: expect.any(Array),
            comments: expect.any(Array),
          })
        );

        done();
      });
  });

  // done
  test('successfully GET ALL posts (with query page_size)', done => {
    page_query.page_size = 1;
    request(app)
      .get('/posts')
      .send(post_one)
      .query(page_query)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            pages_count: expect.any(Number),
            items: expect.any(Array),
          })
        );
        expect(res.body.items[0]).toEqual(expect.any(Object));
        expect(res.body.items[0]).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            place_id: expect.any(String),
            user: expect.any(Object),
            caption: expect.any(String),
            images: expect.any(Array),
            tags: expect.any(Array),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            likes: expect.any(Array),
            comments: expect.any(Array),
          })
        );

        done();
      });
  });

  // done
  test('successfully GET ALL posts (with query page_number)', done => {
    page_query.page_number = 1;
    request(app)
      .get('/posts')
      .send(post_one)
      .query(page_query)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            pages_count: expect.any(Number),
            items: expect.any(Array),
          })
        );
        expect(res.body.items[0]).toEqual(expect.any(Object));
        expect(res.body.items[0]).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            place_id: expect.any(String),
            user: expect.any(Object),
            caption: expect.any(String),
            images: expect.any(Array),
            tags: expect.any(Array),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            likes: expect.any(Array),
            comments: expect.any(Array),
          })
        );

        done();
      });
  });

  // done
  test('successfully GET post BY ID', done => {
    request(app)
      .get(`/posts/${post_one._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            user: expect.objectContaining({
              username: expect.any(String),
              id: expect.any(String),
            }),
            place_id: expect.any(String),
            caption: expect.any(String),
            images: expect.any(Array),
            tags: expect.any(Array),
            likes: expect.any(Array),
            comments: expect.any(Array),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          })
        );

        done();
      });
  });

  // done
  test('successfully EDIT post BY ID', done => {
    request(app)
      .put(`/posts/${post_one._id}`)
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
      .delete(`/posts/${post_one._id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty(
          'message',
          'post has been deleted successfully'
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
