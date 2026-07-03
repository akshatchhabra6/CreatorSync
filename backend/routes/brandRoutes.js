const express = require('express');
const router = express.Router();
const { createBrand, getBrand, updateBrand } = require('../controllers/brandController');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET supports optional auth (own profile) or ?id= for public viewing
router.get('/', (req, res, next) => {
  if (req.headers.authorization) return protect(req, res, next);
  next();
}, getBrand);

router.post('/', protect, authorize('brand'), createBrand);
router.put('/', protect, authorize('brand'), updateBrand);

module.exports = router;
