require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost';
const FIREBASE_CERT_PATH =
  process.env.FIREBASE_CERT_PATH || './certs/google-service.json';

const { initializeApp, cert } = require('firebase-admin/app');
initializeApp({
  credential: cert(require(FIREBASE_CERT_PATH)),
  storageBucket: 'gs://hacktiv8-instafood.appspot.com',
});

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
