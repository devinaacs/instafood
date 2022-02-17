class Cache {
  constructor() {
    this.cache = {};
    this.queueCKeys = [];
  }

  set(key, value) {
    const remover = setTimeout(() => {
      delete this.cache[key];

      if (this.queueCKeys[0] === key) {
        this.queueCKeys.shift();
      }
    }, 60 * 1000);

    this.cache[key] = { value, remover };

    if (this.queueCKeys.length >= 30) {
      const removedCKey = this.queueCKeys.shift();
      clearTimeout(this.cache[removedCKey].remover);
    }

    this.queueCKeys.push(key);
  }

  get(key) {
    return this.cache[key] ? this.cache[key].value : null;
  }
}

module.exports = () => new Cache();
