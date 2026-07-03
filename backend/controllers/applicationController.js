const Application = require('../models/Application');
const Campaign = require('../models/Campaign');
const Brand = require('../models/Brand');

// @route POST /api/applications (creator only)
const applyToCampaign = async (req, res) => {
  try {
    const { campaignId, proposal, price } = req.body;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const application = await Application.create({
      campaign: campaignId,
      creator: req.user._id,
      proposal,
      price,
    });
    res.status(201).json(application);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'You already applied to this campaign' });
    }
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/applications
// creator: own applications. brand: applications for a given campaign (?campaignId=)
const getApplications = async (req, res) => {
  try {
    if (req.user.role === 'creator') {
      const applications = await Application.find({ creator: req.user._id })
        .populate({ path: 'campaign', populate: { path: 'brand', select: 'companyName logo' } })
        .sort({ createdAt: -1 });
      return res.json(applications);
    }

    // brand
    const { campaignId } = req.query;
    const brand = await Brand.findOne({ user: req.user._id });
    const filter = {};
    if (campaignId) {
      filter.campaign = campaignId;
    } else if (brand) {
      const campaigns = await Campaign.find({ brand: brand._id }).select('_id');
      filter.campaign = { $in: campaigns.map((c) => c._id) };
    }

    const applications = await Application.find(filter)
      .populate('creator', 'name email profileImage')
      .populate('campaign', 'title')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/applications/:id/status (brand only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { applyToCampaign, getApplications, updateApplicationStatus };
