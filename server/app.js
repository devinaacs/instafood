const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));
app.use(require('./middlewares/errorHandler'));

module.exports = app;
