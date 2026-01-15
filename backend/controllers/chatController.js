const asyncHandler = require('express-async-handler');
const Chat = require('../models/Chat');
const { chatWithGemini } = require('../services/geminiService');

// @desc    Get chat history
// @route   GET /api/chat
// @access  Private
const getChatHistory = asyncHandler(async (req, res) => {
  let chat = await Chat.findOne({ user: req.user.id });
  
  if (!chat) {
    chat = await Chat.create({ user: req.user.id, messages: [] });
  }

  res.status(200).json(chat);
});

// @desc    Send message to AI
// @route   POST /api/chat
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please add text');
  }

  // Get or Create Chat Session
  let chat = await Chat.findOne({ user: req.user.id });
  if (!chat) {
    chat = await Chat.create({ user: req.user.id, messages: [] });
  }

  // Add user message
  const newMessages = [...chat.messages, { role: 'user', text }];
  
  // Format history for Gemini (simple text based context or specific format)
  // For this simple implementation, we might just pass the last few messages or rely on the service to handle history
  // Our service currently takes simple history array, let's map it if needed
  // For "gemini-pro" specifically via Google AI SDK, history format is:
  // { role: "user" | "model", parts: [{ text: "..." }] }
  
  const historyForGemini = chat.messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
  }));

  // Get AI Response
  const aiResponseText = await chatWithGemini(text, historyForGemini);

  // Add AI response to local history
  newMessages.push({ role: 'model', text: aiResponseText });

  // Update chat document
  chat.messages = newMessages;
  await chat.save();

  res.status(200).json({ 
      userMessage: text,
      aiMessage: aiResponseText,
      updatedChat: chat 
  });
});

module.exports = {
  getChatHistory,
  sendMessage
};
