const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();

require('dotenv').config();
require('./db');

const authRouter = require('./routes/auth');
const stocksRouter = require('./routes/stocks');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/stocks', stocksRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});