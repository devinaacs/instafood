const uuid = require('uuid');

module.exports = {
  random() {
    return uuid.v4();
  },
};
