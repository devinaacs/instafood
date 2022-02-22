const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Post = require('../models/Post');
const tplaceController = require('../controllers/trending');

// jest.mock('../models/TrendingPosts', () => {
//     return {
//         find: () => Promise.reject()
//     }
// });


// jest.mock('../workers/trending', () => {
//     return {
//         find: () => Promise.reject()
//     }
// });



jest.mock('../controllers/trending');

// jest.mock('../models/TrendingPlace', () => {
//     return {
//         find: () => Promise.reject()
//     }
// });

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
    await mongoose.connect('mongodb://localhost:27017/instafood-test-10trend', {
        useNewUrlParser: true,
    });

});

afterAll(async () => {
    require('../helpers/redis').disconnect();
    Post.deleteMany({})
});

describe('test /posts endpoint', () => {
    test('failed to GET TRENDING POSTS', done => {
        // jest.mock('../models/TrendingPosts', () => {
        //     return {
        //         find: () => Promise.reject()
        //     }
        // });
        const mtplaceController = jest.mocked(tplaceController)
        mtplaceController.getPosts.mockImplementation(() => {
            throw new Error({ name: 'network' });
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
        // const mtplaceController = jest.mocked(tplaceController)
        const mtplaceController = jest.mocked(tplaceController)
        // jest.mocked(tplaceController).getPlaces.mockRejectedValue(new Error('Async error')); 


        // const mtplaceController = jest.mocked(tplaceController);
        // const mError = new Error('network');
        // mtplaceController.getPlaces().mockRejectedValue(mError);
        mtplaceController.getPlaces.mockImplementation(() => {
            throw new Error({ name: 'network' });
        });

        // const expectedError = new Error('Failed to connect to ApplePay');
        // payService.initiateApplePayment.mockRejectedValue(expectedError);

        // try {
        //     await payController.createApplePayRequest();

        // jest.mock('../models/TrendingPlace', () => {
        //     return {
        //         find: () => Promise.reject()
        //     }
        // });
        request(app)
            .get('/trending/places')
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    return done(err)
                };
                expect(res.body).toEqual(expect.any(Object));
                expect(res.body).toHaveProperty('message', 'internal server error');
                done();
            });
    });

    test('failed to GET TRENDING POSTS', done => {
        const mtplaceController = jest.mocked(tplaceController)
        mtplaceController.getTags.mockImplementation(() => {
            throw new Error({ name: 'network' });
        });
        request(app)
            .get('/trending/tags')
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toEqual(expect.any(Object));
                expect(res.body).toHaveProperty('message', 'internal server error');
                done();
            });
    });
});
