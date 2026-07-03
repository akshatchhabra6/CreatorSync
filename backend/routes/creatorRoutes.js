const express = require('express');
const router = express.Router();
const {
  getCreators,
  getCreatorById,
  updateCreatorProfile,
  getMyCreatorProfile,
} = require('../controllers/creatorController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getCreators);
router.get('/me/profile', protect, authorize('creator'), getMyCreatorProfile);
router.put('/profile', protect, authorize('creator'), updateCreatorProfile);
router.get('/:id', getCreatorById);

module.exports = router;
