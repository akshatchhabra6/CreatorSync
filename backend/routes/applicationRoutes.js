const express = require('express');
const router = express.Router();
const {
  applyToCampaign,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('creator'), applyToCampaign);
router.get('/', protect, getApplications);
router.put('/:id/status', protect, authorize('brand'), updateApplicationStatus);

module.exports = router;
