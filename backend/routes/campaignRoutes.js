const express = require('express');
const router = express.Router();
const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} = require('../controllers/campaignController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', (req, res, next) => {
  if (req.headers.authorization) return protect(req, res, next);
  next();
}, getCampaigns);

router.post('/', protect, authorize('brand'), createCampaign);
router.get('/:id', getCampaignById);
router.put('/:id', protect, authorize('brand'), updateCampaign);
router.delete('/:id', protect, authorize('brand'), deleteCampaign);

module.exports = router;
