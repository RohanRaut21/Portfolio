const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Languages', 'Frontend', 'Backend', 'Databases', 'Tools', 'Core Concepts']
  },
  proficiency: {
    type: String,
    default: 'Intermediate'
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Skill', SkillSchema);
