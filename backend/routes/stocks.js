const express = require('express');
const router = express.Router();
const stocks = require('../controllers/stocks');
const verifyToken = require('../middleware/verify-token');

router.get('/', verifyToken, stocks.getAll);
router.post('/', verifyToken, stocks.create);
router.put('/:id', verifyToken, stocks.update);
router.delete('/:id', verifyToken, stocks.delete);