const User = require('../models/User');
const CreatorProfile = require('../models/CreatorProfile');
const Brand = require('../models/Brand');
const generateToken = require('../utils/generateToken');

// @route POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!['creator', 'brand'].includes(role)) {
      return res.status(400).json({ message: 'Role must be creator or brand' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, role });

    // Auto-create the linked profile document so it's ready to edit
    if (role === 'creator') {
      await CreatorProfile.create({ user: user._id });
    } else {
      await Brand.create({ user: user._id, companyName: name });
    }

    const token = generateToken(user._id, user.role);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.role);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/auth/profile
const getProfile = async (req, res) => {
  res.json({ user: req.user });
};

// @route PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const { name, profileImage } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (profileImage) user.profileImage = profileImage;
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login, getProfile, updateProfile };
