const Message = require('../models/Message');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const submitMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  submitMessage
};
