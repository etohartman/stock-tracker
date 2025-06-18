const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();

require('dotenv').config();
require('./db');

const authRouter = require('./routes/auth');
const stocksRouter = require('./routes/stocks');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use('/api/auth', authRouter);
app.use('/api/stocks', stocksRouter);

// Catch-all route for React Router (must be after API routes)
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});

app.get('/test', (req, res) => res.send('ok'));