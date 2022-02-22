const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const UserController = require('../controllers/user');

jest.mock('../helpers/fstorage', () => ({
    getBucket: () => ({}),
}));

jest.mock('../models/User', () => {
    return {
        create: () => Promise.reject()
    }
});

let userOne = {
    username: 'user.one',
    email: 'user.one@mail.com',
    password: '12345aaa',
};

let userTwo = {
    username: 'user.two',
    email: 'user.two@mail.com',
    password: '12345aaa',
};


beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect('mongodb://localhost:27017/instafood-test-9fail-user', {
        useNewUrlParser: true,
    });
});



afterAll(async () => {
    
    require('../helpers/redis').disconnect();
});

describe('test /user endpoint', () => {
    test('failed to GET ALL users', done => {
        // const mError = new Error({ message: 'internal server error' });
        // mUserController.listUsers.mockImplementation(() => {
        //     throw new Error({ name: 'network' });
        // });
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    return done(err)
                };
                // expect(res.body).toEqual(expect.any(Object));
                // expect(res.body).toHaveProperty('message', 'internal server error');
                done();
            });
    });
});