const { default: axios } = require('axios');
const redis = require('../helpers/redis');

const PLACE_DETAIL_URL =
  'https://maps.googleapis.com/maps/api/place/details/json';

module.exports = {
  async getPlaceDetail(placeId) {
    const cacheKey = `place.${placeId}`;
    const cachedResult = await redis.get(cacheKey);

    if (cachedResult) {
      return cachedResult;
    }

    const { data } = await axios.get(PLACE_DETAIL_URL, {
      params: {
        place_id: placeId,
        fields: 'photos,name,formatted_address,icon',
        key: process.env.GPLACES_API_KEY,
      },
    });

    const result = {
      name: data.result.name,
      address: data.result.formatted_address,
      icon: data.result.icon,
      photos: data.result.photos.map(v => v.photo_reference)
    };
    redis.set(cacheKey, result);

    return result;
  }
}
