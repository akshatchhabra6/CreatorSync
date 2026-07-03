const CreatorProfile = require('../models/CreatorProfile');
const User = require('../models/User');

// @route GET /api/creators  (list/search/filter creators)
// query params: niche, minFollowers, location
const getCreators = async (req, res) => {
  try {
    const { niche, minFollowers, location } = req.query;
    const filter = {};
    if (niche) filter.niche = new RegExp(niche, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (minFollowers) {
      filter['followers.instagram'] = { $gte: Number(minFollowers) };
    }

    const creators = await CreatorProfile.find(filter).populate('user', 'name email profileImage');
    res.json(creators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/creators/:id  (:id is the CreatorProfile _id)
const getCreatorById = async (req, res) => {
  try {
    const creator = await CreatorProfile.findById(req.params.id).populate(
      'user',
      'name email profileImage'
    );
    if (!creator) return res.status(404).json({ message: 'Creator not found' });
    res.json(creator);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/creators/profile  (own profile, creator role only)
const updateCreatorProfile = async (req, res) => {
  try {
    const updates = req.body;
    const profile = await CreatorProfile.findOneAndUpdate(
      { user: req.user._id },
      { $set: updates },
      { new: true, upsert: true }
    ).populate('user', 'name email profileImage');
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/creators/me/profile (own profile)
const getMyCreatorProfile = async (req, res) => {
  try {
    const profile = await CreatorProfile.findOne({ user: req.user._id }).populate(
      'user',
      'name email profileImage'
    );
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCreators, getCreatorById, updateCreatorProfile, getMyCreatorProfile };
