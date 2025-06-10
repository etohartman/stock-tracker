const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocks');
const verifyToken = require('../middleware/verify-token');

// Get all stocks for the logged-in user
router.get('/', verifyToken, stocksController.getAll);

// Create a new stock
router.post('/', verifyToken, stocksController.create);

// Update a stock by ID (only if owned by user)
router.put('/:id', verifyToken, stocksController.update);

// Delete a stock by ID (only if owned by user)
router.delete('/:id', verifyToken, stocksController.delete);

module.exports = router;