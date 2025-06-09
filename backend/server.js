const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();

const hootsRouter = require('./controllers/hoots.js');

require('dotenv').config();
require('./db');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());

app.use('/api/hoots', hootsRouter);

// API Routes

// Use a "catch-all" route to deliver the frontend's production index.html
app.get('/*splat', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});

