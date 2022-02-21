const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

process.env.GPLACES_API_KEY = 'AIzaSyChgN3eiM_Da0_gJpF3XmpkQ_53CfZyrsk';

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({
    upload(a, b, c) {
      c(null, {
        makePublic(c2) {
          c2(null);
        },
        publicUrl() {
          return 'https://storage.googleapis.com/hacktiv8-instafood.appspot.com/development/posts/6212b5edde2f72451b3865c3/img-1.jpg';
        },
      });
    },
  }),
}));

let place_ref_test = 'ChIJj9vzoKX2aS4RF3EGNHjn2tU';
let search_resto = { name: 'Bebek BKB' };
let search_photo = {
  ref: 'Aap_uEC4lSsm067sV9tcOYfA_wXreIws5R4ZG3yw7d3ew8T75QbfIaufC5RtN9sOrKjjFrm7OE-1oz5NZyldq090iDZH3Cs490JZhc4iyMsPOLa9rHyxbRNjml0ZrAV9W5-xE65S8r6viYCs_O4VULh9qNCTeBVmoltZLV3icgimatg04-Ld',
};

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/instafood-test-5place', {
    useNewUrlParser: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  require('../helpers/redis').disconnect();
});

describe('test places endpoint', () => {
  test('successfully GET ALL places', done => {
    request(app)
      .get('/places')
      .query(search_resto)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            place_id: expect.any(String),
            name: expect.any(String),
            address: expect.any(String),
            icon: expect.any(String),
            photo_reference: expect.any(String),
          })
        );
        done();
      });
  });

  // done
  test('successfully GET places BY place_id', done => {
    request(app)
      .get(`/places/${place_ref_test}`)
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
            name: expect.any(String),
            address: expect.any(String),
            icon: expect.any(String),
            photos: expect.any(Array),
          })
        );
        done();
      });
  });

  test('successfully GET places PHOTO', done => {
    request(app)
      .get('/places/photo')
      .query(search_photo)
      .set('Accept', 'application/json')
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
