const express = require('express');
const router = express.Router();
const {
  getEntries,
  createEntry,
  deleteEntry
} = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getEntries).post(protect, createEntry);
router.route('/:id').delete(protect, deleteEntry);

module.exports = router;
