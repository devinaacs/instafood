const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const app = require('../app');
const testImage = '../assets/BebekBkb.jpg';
const { createToken } = require('../helpers/jwt');

jest.mock('../helpers/fstorage', () => ({
    getBucket: () => ({}),
}));


let post_one = {
    place_id: "ChIJj9vzoKX2aS4RF3EGNHjn2tU",
    user_id: "620f55de92e0babea2ccb10a",
    caption: "Nasi uduk ayam goreng negerinya enak banget, apalagi pake sayur asem dan es teh manis. beuh, rasanya, ahMantab!",
    tags: ['nasiUduk', 'mantab', 'bebekBkb'],
    // images: [testImage]
    images: ["https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/621021b010577cdc8447bfee/img-1.jpg"]
};

const access_token = createToken({
    _id: "620f55de92e0babea2ccb10a",
    name: "devinaacs",
    email: "devinaa@mail.com"
})

let edit_post = {
    caption: "caption yg sudah di edit"
}

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost', { useNewUrlParser: true });

    await Post.deleteMany({});

    const test_post = await Post.create(post_one);
    post_one.id = test_post._id
    // console.log(post_one.id)
});

describe('test /posts endpoint', () => {
    test('successfully CREATE post', done => {
        const post_two = {
            place_id: "ChIJj9vzoKX2aS4RF3EGNHjn2tU",
            user_id: "620f55de92e0babea2ccb10a",
            caption: "Nasi uduk ayam goreng negerinya enak banget, apalagi pake sayur asem dan es teh manis. beuh, rasanya, ahMantab!",
            tags: ['nasiUduk', 'mantab', 'bebekBkb'],
            images: [testImage]

        };

        request(app)
            .post('/posts')
            .set('access_token', access_token)
            .send(post_two)
            .set('Accept', 'application/json')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    return done(err)
                };
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
                if (err) {
                    console.log(err)
                    return done(err)
                };
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

                expect(res.body).toEqual(expect.any(Object))

                done();
            });
    });



    test('successfully EDIT post BY ID', done => {
        request(app)
            .put(`/posts/${post_one.id}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(edit_post)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    return done(err)
                };

                expect(res.body).toEqual(expect.any(Object))


                done();
            });
    });


    test.only('successfully DELETE post BY ID', done => {
        request(app)
            .delete(`/posts/${post_one.id}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    return done(err)
                };

                expect(res.body).toEqual(expect.any(Object))


                done();
            });
    });
});
