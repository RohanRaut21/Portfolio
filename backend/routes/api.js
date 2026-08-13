const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const {
  loginAdmin,
  getMessages,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/adminController');

const { submitMessage } = require('../controllers/contactController');

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/portfolioController');

// Contact route
router.post('/contact', submitMessage);

// Admin Auth route
router.post('/admin/login', loginAdmin);

// Admin Messages routes (Protected)
router.get('/admin/messages', protect, getMessages);
router.put('/admin/messages/:id', protect, updateMessageStatus);
router.delete('/admin/messages/:id', protect, deleteMessage);

// Projects routes
router.get('/projects', getProjects);
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Skills routes
router.get('/skills', getSkills);
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

module.exports = router;
