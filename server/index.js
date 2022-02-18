require('dotenv').config();
require('./helpers/fstorage').init();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost';

const mongoose = require('mongoose');
const app = require('./app');

async function start() {
  console.log('connecting to mongodb');
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
  console.log('connected to mongodb');

  app.listen(PORT, () => {
    console.log(`🚀 server app listening on port ${PORT}`);
  });
}

start();
