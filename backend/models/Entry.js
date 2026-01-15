const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
    required: [true, 'Please add some content']
  },
  mood: {
    type: String, // e.g., 'Happy', 'Sad', 'Anxious'
    required: false
  },
  sentimentScore: {
    type: Number, // -1 to 1
    required: false
  },
  aiAnalysis: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Entry', entrySchema);
