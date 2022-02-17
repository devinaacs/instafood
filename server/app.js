require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () =>
  console.log('connected to DB')
);

app.listen(PORT, () => {
  console.log(`🚀 server app listening on port ${PORT}`);
});
