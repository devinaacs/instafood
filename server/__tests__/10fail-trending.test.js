const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Post = require('../models/Post');



// jest.mock('../models/TrendingTag', () => {
//     return {
//         find: () => Promise.reject()
//     }
// });

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

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/instafood-test-6trending', {
        useNewUrlParser: true,
    });
    Post.deleteMany({})
});

afterAll(async () => {
    require('../helpers/redis').disconnect();
    Post.deleteMany({})
});

describe('test /posts endpoint', () => {
    test.only('failed to GET TRENDING POSTS', done => {
        jest.mock('../models/TrendingPosts', () => {
            return {
                find: () => Promise.reject()
            }
        });
        request(app)
            .get('/trending/posts')
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toEqual(expect.any(Object));
                expect(res.body).toHaveProperty('message', 'internal server error');
                done();
            });
    });

    test('failed to GET TRENDING PLACES', done => {
        jest.mock('../models/TrendingPlace', () => {
            return {
                find: () => Promise.reject()
            }
        });
        request(app)
            .get('/trending/places')
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                console.log(res)
                expect(res.body).toEqual(expect.any(Object));
                expect(res.body).toHaveProperty('message', 'internal server error');
                done();
            });
    });

    // test.only('failed to GET TRENDING POSTS', done => {
    //     request(app)
    //         .get('/trending/tags')
    //         .set('Accept', 'application/json')
    //         .expect(500)
    //         .end((err, res) => {
    //             if (err) return done(err);
    //             expect(res.body).toEqual(expect.any(Object));
    //             expect(res.body).toHaveProperty('message', 'internal server error');
    //             done();
    //         });
    // });
});
