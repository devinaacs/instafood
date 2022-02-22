const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URI || 'redis://localhost', { lazyConnect: true });

module.exports = {
  async connect() {
    return redis.connect();
  },

  async get(key) {
    const result = await redis.get(key);

    return JSON.parse(result);
  },

  async set(key, value, exp = 30) {
    return redis.set(key, JSON.stringify(value), 'EX', exp);
  },

  async del(key) {
    return redis.del(key);
  },

  disconnect() {
    redis.disconnect();
  },
};
