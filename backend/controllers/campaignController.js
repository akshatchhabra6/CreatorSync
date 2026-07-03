const Campaign = require('../models/Campaign');
const Brand = require('../models/Brand');

// @route POST /api/campaigns (brand only)
const createCampaign = async (req, res) => {
  try {
    const brand = await Brand.findOne({ user: req.user._id });
    if (!brand) return res.status(400).json({ message: 'Create a brand profile first' });

    const campaign = await Campaign.create({ ...req.body, brand: brand._id });
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/campaigns
// query params: status, platform, niche, brand, mine=true (requires auth, brand's own campaigns)
const getCampaigns = async (req, res) => {
  try {
    const { status, platform, niche, brand, mine } = req.query;
    const filter = {};

    if (mine === 'true' && req.user) {
      const myBrand = await Brand.findOne({ user: req.user._id });
      if (!myBrand) return res.json([]);
      filter.brand = myBrand._id;
    } else {
      filter.status = status || 'active';
    }

    if (platform) filter.platform = platform;
    if (niche) filter.niche = new RegExp(niche, 'i');
    if (brand) filter.brand = brand;

    const campaigns = await Campaign.find(filter)
      .populate({ path: 'brand', select: 'companyName logo industry location' })
      .sort({ createdAt: -1 });

    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/campaigns/:id
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('brand');
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/campaigns/:id (owning brand only)
const updateCampaign = async (req, res) => {
  try {
    const brand = await Brand.findOne({ user: req.user._id });
    const campaign = await Campaign.findOne({ _id: req.params.id, brand: brand?._id });
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    Object.assign(campaign, req.body);
    await campaign.save();
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route DELETE /api/campaigns/:id (owning brand only)
const deleteCampaign = async (req, res) => {
  try {
    const brand = await Brand.findOne({ user: req.user._id });
    const campaign = await Campaign.findOneAndDelete({ _id: req.params.id, brand: brand?._id });
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign };
