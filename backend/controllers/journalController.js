const asyncHandler = require('express-async-handler');
const Entry = require('../models/Entry');
const { analyzeSentiment } = require('../services/geminiService');

// @desc    Get all entries
// @route   GET /api/entries
// @access  Private
const getEntries = asyncHandler(async (req, res) => {
  const entries = await Entry.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(entries);
});

// @desc    Create new entry
// @route   POST /api/entries
// @access  Private
const createEntry = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error('Please add text content');
  }

  // Analyze sentiment
  const analysisResult = await analyzeSentiment(content);

  const entry = await Entry.create({
    user: req.user.id,
    content,
    mood: analysisResult.mood,
    sentimentScore: analysisResult.sentimentScore,
    aiAnalysis: analysisResult.analysis
  });

  res.status(201).json(entry);
});

// @desc    Delete entry
// @route   DELETE /api/entries/:id
// @access  Private
const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the entry user
  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await entry.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEntries,
  createEntry,
  deleteEntry
};
