const Brand = require('../models/Brand');

// @route POST /api/brand  (create, brand role only - usually auto-created at signup)
const createBrand = async (req, res) => {
  try {
    const exists = await Brand.findOne({ user: req.user._id });
    if (exists) return res.status(409).json({ message: 'Brand profile already exists' });

    const brand = await Brand.create({ ...req.body, user: req.user._id });
    res.status(201).json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/brand  (own profile if authenticated brand, else pass ?id=)
const getBrand = async (req, res) => {
  try {
    let brand;
    if (req.query.id) {
      brand = await Brand.findById(req.query.id).populate('user', 'name email profileImage');
    } else if (req.user) {
      brand = await Brand.findOne({ user: req.user._id }).populate('user', 'name email profileImage');
    }
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/brand (own profile)
const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, upsert: true }
    ).populate('user', 'name email profileImage');
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBrand, getBrand, updateBrand };
