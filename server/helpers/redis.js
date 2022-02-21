const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URI || 'redis://localhost');

module.exports = {
  async get(key) {
    const result = await redis.get(key);

    return JSON.parse(result);
  },

  async set(key, value, exp = 30) {
    if (typeof value != 'string') {
      value = JSON.stringify(value);
    }

    if (exp) {
      return redis.set(key, value, 'EX', exp);
    } else {
      return redis.set(key, value);
    }
  },

  async del(key) {
    return redis.del(key);
  },

  // disconnect() {
  //   redis.disconnect();
  // },
};
