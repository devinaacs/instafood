const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const app = require('../app');
const { createToken } = require('../helpers/jwt');
const TrendingPosts = require('../models/TrendingPosts');
const TrendingTag = require('../models/TrendingTag');
const TrendingPlace = require('../models/TrendingPlace');
const actTrendingVersion = require('../actions/trendingVersion');
const TrendingVersion = require('../models/TrendingVersion');


jest.mock('../helpers/fstorage', () => ({
    getBucket: () => ({
        upload(a, b, c) {
            c(null, {
                makePublic(c2) {
                    c2(null);
                },
                publicUrl() {
                    return "https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/6212b5edde2f72451b3865c3/img-1.jpg";
                },
            });
        },
    }),
}));


jest.mock('../actions/trendingVersion', () => ({
    readyVersion() {
        return 1
    }
}))
let access_token = '';

let post_one = {
    place_id: '6210cc70bf599130a9a9c40f',
    caption: 'Test caption food from comment test',
    tags: ['test', 'success', 'failed'],
};

let trending_version = {
    draft: 1,
    ready: 0,
}

let trending_tag = {
    version: 1,
    tag: "test",
    popularity: 100,
    most_popular: {
        post: "",
        popularity: 100,
    },
}

let trending_post = {
    version: 1,
    posts: []
}

let trending_place = {
    version: 1,
    place_id: '6210cc70bf599130a9a9c40f',
    popularity: 100,
    most_popular: {
        post: "",
        popularity: 100,
    },
}

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost', { useNewUrlParser: true });

    await TrendingVersion.deleteMany({})
    await TrendingPlace.deleteMany({})
    await TrendingPosts.deleteMany({})
    await TrendingTag.deleteMany({})



    const user = await User.findOne({ email: 'user.one@mail.com' });
    post_one.user = user._id;

    access_token = createToken({
        id: user._id,
        email: user.email,
    });

    const test_post = await Post.create(post_one);
    post_one._id = test_post._id;
    trending_place.most_popular.post = test_post._id

    const tv = await TrendingVersion.create(trending_version)


    trending_post.posts.push(test_post._id)
    const test_trendplace = await TrendingPlace.create(trending_place)
    trending_place._id = test_trendplace._id
    const test_trendpost = await TrendingPosts.create(trending_post)
    trending_post._id = await test_trendpost._id
    const test_trendtag = await TrendingTag.create(trending_tag)
    trending_tag._id = test_trendtag._id

});

// afterAll(async () => {
//     await mongoose.disconnect();
//     require('../helpers/redis').disconnect();
// });

describe('test /trending endpoint', () => {

    test('successfully GET ALL trending posts', done => {
        request(app)
            .get('/trending/posts')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                console.log(res.body)
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        user: expect.objectContaining({
                            id: expect.any(String),
                            username: expect.any(String)
                        }),
                    })
                );
                done();
            });
    });

    test('successfully GET ALL trending places', done => {
        request(app)
            .get(`/trending/places`)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).toBeInstanceOf(Array);
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        "most_popular": expect.objectContaining({
                            "post": expect.objectContaining({
                                "id": expect.any(String),
                                "user": expect.objectContaining({
                                    "id": expect.any(String),
                                    "username": expect.any(String),
                                }),
                                "images": expect.any(Array),
                                "tags": expect.any(Array),
                            }),
                            "popularity": expect.any(Number)
                        }),
                        "version": expect.any(Number),
                        "place_id": expect.any(String),
                        "popularity": expect.any(Number)
                    })
                );

                done();
            });
    });

    test('successfully GET ALL trending tags', done => {
        request(app)
            .get(`/trending/tags`)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).toBeInstanceOf(Array);
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        "most_popular": expect.objectContaining({
                            "post": expect.objectContaining({
                                "id": expect.any(String),
                                "user": expect.objectContaining({
                                    "id": expect.any(String),
                                    "username": expect.any(String),
                                }),
                                "images": expect.any(Array),
                                "tags": expect.any(Array),
                            }),
                            "popularity": expect.any(Number)
                        }),
                        "version": expect.any(Number),
                        "tags": expect.any(String),
                        "popularity": expect.any(Number)
                    })
                );

                done();
            });
    });


});
