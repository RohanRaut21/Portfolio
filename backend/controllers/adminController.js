const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Message = require('../models/Message');

// Generate JWT
const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET || 'secret1234', {
    expiresIn: '30d'
  });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Please provide username and password' });
    }

    // Check database admin
    let admin = await Admin.findOne({ username });
    
    // If not found in database, check fallback env credentials to allow seamless setup
    const defaultUser = process.env.ADMIN_USERNAME || 'admin';
    const defaultPass = process.env.ADMIN_PASSWORD || 'adminpassword';
    
    let isMatch = false;
    let adminId = 'default_admin_id';
    
    if (admin) {
      isMatch = await admin.matchPassword(password);
      adminId = admin._id;
    } else if (username === defaultUser && password === defaultPass) {
      isMatch = true;
    }

    if (isMatch) {
      res.json({
        success: true,
        token: generateToken(adminId, username),
        admin: {
          username: username
        }
      });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/admin/messages
// @access  Private (Admin Only)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Mark message as read/unread
// @route   PUT /api/admin/messages/:id
// @access  Private (Admin Only)
const updateMessageStatus = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    message.isRead = req.body.isRead !== undefined ? req.body.isRead : !message.isRead;
    await message.save();

    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/admin/messages/:id
// @access  Private (Admin Only)
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    await message.deleteOne();
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  loginAdmin,
  getMessages,
  updateMessageStatus,
  deleteMessage
};
