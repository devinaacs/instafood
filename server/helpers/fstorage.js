const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const FIREBASE_CERT_PATH =
  process.env.FIREBASE_CERT_PATH || '../certs/google-service.json';

module.exports = {
  getBucket() {
    return getStorage().bucket();
  },
  init() {
    initializeApp({
      credential: cert(require(FIREBASE_CERT_PATH)),
      storageBucket: 'gs://hacktiv8-instafood.appspot.com',
    });
  },
};
