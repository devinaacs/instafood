const { default: axios } = require('axios');
const redis = require('../helpers/redis');
const actPlace = require('../actions/place');

const TEXT_SEARCH_URL =
  'https://maps.googleapis.com/maps/api/place/textsearch/json';
const PHOTO_URL = 'https://maps.googleapis.com/maps/api/place/photo';

module.exports = {
  async searchPlaces(req, res, next) {
    try {
      let locationKey = 'default';

      const cacheKey = `${locationKey}.${req.query.name}`;
      const cachedResult = await redis.get(cacheKey);

      if (cachedResult) {
        return res.json(cachedResult);
      }

      const params = {
        key: process.env.GPLACES_API_KEY,
        query: req.query.name,
        location: '-6.170280329097068,106.8240104937367'
      };

      const { data } = await axios.get(TEXT_SEARCH_URL, { params });
      const result = data.results
        .map(v => ({
          place_id: v.place_id,
          name: v.name,
          address: v.formatted_address,
          icon: v.icon,
          photo_reference: v.photos ? v.photos[0].photo_reference : undefined,
        }))
        .slice(0, 10);

      redis.set(cacheKey, result);

      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async getPhoto(req, res, next) {
    try {
      const response = await axios.get(PHOTO_URL, {
        params: {
          maxwidth: 600,
          maxheight: 600,
          key: process.env.GPLACES_API_KEY,
          photo_reference: req.query.ref,
        },
        responseType: 'arraybuffer',
      });

      res.set('Content-Type', 'image/jpeg');
      res.end(Buffer.from(response.data, 'binary'));
    } catch (err) {
      next(err);
    }
  },

  async getPlaceDetail(req, res, next) {
    try {
      res.json(await actPlace.getPlaceDetail(req.params.id));
    } catch (err) {
      next(err);
    }
  }
};
