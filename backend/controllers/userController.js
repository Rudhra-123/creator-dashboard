const User = require('../models/User');

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.updateCredits = async (req, res) => {
  const { credits } = req.body;
  await User.findByIdAndUpdate(req.params.id, { credits });
  res.json({ message: 'Credits updated' });
};
