const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    required: true
  },
  liveLink: {
    type: String,
    default: ''
  },
  githubLink: {
    type: String,
    default: ''
  },
  bulletPoints: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    default: 'MERN Stack'
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
