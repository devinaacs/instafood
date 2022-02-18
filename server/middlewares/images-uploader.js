const multer = require('multer');
const path = require('path');
const uuid = require('../helpers/uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${uuid.random()}${path.extname(file.originalname)}`
    );
  },
});

module.exports = multer({ storage }).array('images', 10);
