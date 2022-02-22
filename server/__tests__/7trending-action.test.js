const mongoose = require('mongoose');
const TrendingVersion = require('../models/TrendingVersion');
const actTrendingVersion = require('../actions/trendingVersion');

jest.mock('../helpers/fstorage', () => ({
  getBucket: () => ({}),
}));

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/instafood-test-7trending-actions', {
    useNewUrlParser: true,
  });

  await TrendingVersion.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  require('../helpers/redis').disconnect();
});

describe('test trending action', () => {
  test('successfully initialize trending version', done => {
    actTrendingVersion.instance()
      .then(() => TrendingVersion.findOne({}))
      .then(result => {
        expect(result.draft).toEqual(1);
        expect(result.ready).toEqual(0);

        done();
      });
  });
});
