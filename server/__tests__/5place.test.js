const request = require('supertest');
const mongoose = require('mongoose');
const axios = require('axios');
const redis = require('../helpers/redis');
const app = require('../app');

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

jest.mock('axios');

let search_photo = {
  ref: 'Aap_uEC4lSsm067sV9tcOYfA_wXreIws5R4ZG3yw7d3ew8T75QbfIaufC5RtN9sOrKjjFrm7OE-1oz5NZyldq090iDZH3Cs490JZhc4iyMsPOLa9rHyxbRNjml0ZrAV9W5-xE65S8r6viYCs_O4VULh9qNCTeBVmoltZLV3icgimatg04-Ld',
};

beforeAll(async () => {
  await redis.connect();
  await mongoose.connect('mongodb://localhost:27017/instafood-test-5place', {
    useNewUrlParser: true,
  });
});

beforeEach(async () => {
  await redis.del('default.name');
  await redis.del('place.testPlaceId');
  jest.resetAllMocks();
});

afterAll(async () => {
  await mongoose.disconnect();
  require('../helpers/redis').disconnect();
});

describe('test places endpoint', () => {
  test('GET /places - successfully get places', done => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          {
            place_id: 'place id',
            name: 'place name',
            formatted_address: 'place address',
            icon: 'place icon',
            photos: [{
              photo_reference: 'photo reference'
            }]
          }
        ]
      }
    });

    request(app)
      .get('/places')
      .query({ name: 'name' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

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

  test('GET /places - successfully get places with no photos', done => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          {
            place_id: 'place id',
            name: 'place name',
            formatted_address: 'place address',
            icon: 'place icon'
          }
        ]
      }
    });

    request(app)
      .get('/places')
      .query({ name: 'name' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            place_id: expect.any(String),
            name: expect.any(String),
            address: expect.any(String),
            icon: expect.any(String)
          })
        );

        done();
      });
  });

  test('GET /places/:id - successfully GET places BY place_id', done => {
    axios.get.mockResolvedValue({
      data: {
        result: {
          name: 'place name',
          formatted_address: 'place address',
          icon: 'place icon',
          photos: [{
            photo_reference: 'photo reference'
          }]
        }
      }
    });

    request(app)
      .get(`/places/testPlaceId`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

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
    axios.get.mockResolvedValue({
      data: new ArrayBuffer(16)
    });

    request(app)
      .get('/places/photo')
      .query(search_photo)
      .set('Accept', 'application/json')
      .expect(200)
      .end(err => {
        if (err) done(err);
        else done();
      });
  });
});
