const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const app = require('../app');
const TrendingPosts = require('../models/TrendingPosts');
const TrendingTag = require('../models/TrendingTag');
const TrendingPlace = require('../models/TrendingPlace');
const TrendingVersion = require('../models/TrendingVersion');
const actTrendingVersion = require('../actions/trendingVersion');

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({}),
}));

const PLACE_ID = '6210cc70bf599130a9a9c40f';
const TAG = 'cuisine';

let postOne = null;

let trendingVersion = {
  draft: 2,
  ready: 1,
};

let trendingTag = {
  version: 1,
  tag: TAG,
  popularity: 100,
  most_popular: {
    post: null,
    popularity: 100,
  },
};

let trendingPosts = {
  version: 1,
  posts: [],
};

let trendingPlace = {
  version: 1,
  place_id: PLACE_ID,
  popularity: 100,
  most_popular: {
    post: null,
    popularity: 100,
  },
};

let postTwo = null;
let trendingPostsTwo = {
  version: 2,
  posts: []
}

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/instafood-test-6trending', {
    useNewUrlParser: true,
  });

  await User.deleteMany({});
  await TrendingVersion.deleteMany({});
  await TrendingPlace.deleteMany({});
  await TrendingPosts.deleteMany({});
  await TrendingTag.deleteMany({});

  const user = await User.create({
    username: 'user.100',
    email: 'user.100@mail.com',
    password: '12345aaa',
  });
  const userTwo = await User.create({
    username: 'user.200',
    email: 'user.200@mail.com',
    password: '12345aaa',
  });

  postOne = await Post.create({
    user: user._id,
    place_id: PLACE_ID,
    caption: 'Test caption food from comment test',
    tags: [TAG, 'success', 'failed'],
  });
  trendingPosts.posts.push(postOne);
  trendingPlace.most_popular.post = postOne._id;
  trendingTag.most_popular.post = postOne._id;

  trendingVersion = await TrendingVersion.create(trendingVersion);
  await TrendingPosts.create(trendingPosts);
  await TrendingPlace.create(trendingPlace);
  await TrendingTag.create(trendingTag);

  postTwo = await Post.create({
    user: userTwo._id,
    place_id: PLACE_ID,
    tags: []
  });
  trendingPostsTwo.posts.push(postTwo);

  await TrendingPosts.create(trendingPostsTwo);
});

afterAll(async () => {
  await mongoose.disconnect();
  require('../helpers/redis').disconnect();
});

describe('test /trending endpoint', () => {
  test('successfully GET ALL trending posts', done => {
    request(app)
      .get('/trending/posts')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            user: expect.objectContaining({
              id: expect.any(String),
              username: expect.any(String),
            }),
          })
        );
        done();
      });
  });

  test('successfully GET ALL trending places', done => {
    request(app)
      .get('/trending/places')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            most_popular: expect.objectContaining({
              post: expect.objectContaining({
                id: expect.any(String),
                user: expect.objectContaining({
                  id: expect.any(String),
                  username: expect.any(String),
                }),
                images: expect.any(Array),
                tags: expect.any(Array),
              }),
              popularity: expect.any(Number),
            }),
            version: expect.any(Number),
            place_id: expect.any(String),
            popularity: expect.any(Number),
          })
        );

        done();
      });
  });

  test('successfully GET ALL trending tags', done => {
    request(app)
      .get('/trending/tags')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            most_popular: expect.objectContaining({
              post: expect.objectContaining({
                id: expect.any(String),
                user: expect.objectContaining({
                  id: expect.any(String),
                  username: expect.any(String),
                }),
                images: expect.any(Array),
                tags: expect.any(Array),
              }),
              popularity: expect.any(Number),
            }),
            version: expect.any(Number),
            tag: expect.any(String),
            popularity: expect.any(Number),
          })
        );

        done();
      });
  });

  test('sucessfully retrieve shifted trending version', done => {
    actTrendingVersion.instance()
      .then(result => {
        result.ready = 1;
        result.draft = 2;
        return result.save()
      })
      .then(actTrendingVersion.shiftVersion)
      .then(() => {
        return actTrendingVersion.draftVersion()
          .then(draft => expect(draft).toEqual(1))
          .then(() => actTrendingVersion.readyVersion())
          .then(ready => expect(ready).toEqual(2));
      })
      .then(() => {
        request(app)
          .get('/trending/posts')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0].user.username).toEqual('user.200');

            done();
          });
      })
  });

});
