const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocks');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const notesController = require('../controllers/notes');

// Get all stocks for the logged-in user
router.get('/', ensureLoggedIn, stocksController.index);

router.get('/:id', ensureLoggedIn, stocksController.show);

// Create a new stock
router.post('/', ensureLoggedIn, stocksController.create);
router.post('/:stockId/notes', ensureLoggedIn, notesController.create);

// Update a stock by ID (only if owned by user)
router.put('/:id', ensureLoggedIn, stocksController.update);

// Delete a stock by ID (only if owned by user)
router.delete('/:id', ensureLoggedIn, stocksController.deleteStock);

module.exports = router;